import { Response } from 'express';
import { AuthenticatedRequest } from '../interfaces/AuthRequest.interface';
import { asyncWrapper } from '../utils/asyncWrapper';
import validator from 'validator';
import { BAD_REQUEST, CONFLICT, CREATED, EVERYTHING_OK, INTERNAL_SERVER_ERROR, NO_CONTENT, UNAUTHORIZED } from '../config/statusCode';
import { escapeSpecialCharacters } from '../utils/escapedSpecialCharacters';
import { createUser, findAndDeleteUser, findAndUpdateUser, findUser } from '../services/user.service';
import { isValidPassword } from '../utils/isValidPassword';
import { cleanXSS } from '../utils/sanitize';
import { User } from '../interfaces/User.interface';
import { comparePassword, encryptPassword } from '../utils/bcrypt';
import { genToken } from '../utils/genToken';

/**
 * @method [POST] user signup
 */
// This function handles user signup.
// It is wrapped in an async function to handle asynchronous operations.
export const postUserSignup = asyncWrapper(
  async ({ body }: AuthenticatedRequest, res: Response) => {
    // Extract relevant data from the request body.
    const { username, email, password, confirmPassword } = body;

    // Check if an email is provided and validate its format.
    if (!email || !validator.isEmail(email))
      return res.status(BAD_REQUEST).json({ message: 'INVALID_EMAIL' });

    // Escape special characters in the email and clean it to prevent XSS attacks.
    const escapedEmail: string = escapeSpecialCharacters(email);
    const cleanEmail: string = cleanXSS(escapedEmail);

    // Check if the user already exists based on the cleaned email.
    const isExistingUser = await findUser(cleanEmail);

    // If the user already exists, return a 'CONFLICT' error.
    if (isExistingUser)
      return res.status(CONFLICT).json({ message: 'ALREADY_USER_WITH_THAT_EMAIL' });

    // Check if a username is provided.
    if (!username)
      return res.status(BAD_REQUEST).json({ message: 'USERNAME_FIELD_NOT_FOUND' });

    // Escape special characters in the username and clean it to prevent XSS attacks.
    const escapedUsername: string = escapeSpecialCharacters(username);
    const cleanUsername: string = cleanXSS(escapedUsername);

    // Validate the password: length, complexity, and matching confirmation.
    if (!password || password.length < 10 || !isValidPassword(password))
      return res.status(BAD_REQUEST).json({ message: 'INVALID_PASSWORD' });

    if (password !== confirmPassword)
      return res.status(BAD_REQUEST).json({ message: 'PASSWORD_NOT_MATCH' });

    // Escape special characters in the password and clean it to prevent XSS attacks.
    const escapedPassword: string = escapeSpecialCharacters(password);
    const cleanPassword: string = cleanXSS(escapedPassword);

    // Hash the cleaned password for security.
    const passwordHashed = await encryptPassword(cleanPassword);

    // Create a user object with cleaned username, email, and hashed password.
    const user: User = {
      username: cleanUsername,
      email: cleanEmail,
      password: passwordHashed
    };

    // Create the user in the database.
    const data = await createUser(user);

    // If signup fails, return an 'USER_SIGNUP_FAILED' error.
    if (!data)
      return res.status(INTERNAL_SERVER_ERROR).json({ message: 'USER_SIGNUP_FAILED' });

    // Return a successful response with status 'CREATED' and a 'signup' flag.
    return res.status(CREATED).json({ signup: true });
  }
);

/**
 * @method [POST] user login
 */
// This function handles user login.
// It is wrapped in an async function to handle asynchronous operations.
export const postUserLogin = asyncWrapper(
  async ({ body: { email, password } }: AuthenticatedRequest, res: Response) => {
    // Check if an email is provided.
    if (!email)
      return res.status(BAD_REQUEST).json({ message: 'EMAIL_NOT_FOUND' });

    // Escape special characters in the email and clean it to prevent XSS attacks.
    const escapedEmail: string = escapeSpecialCharacters(email);
    const cleanEmail: string = cleanXSS(escapedEmail);

    // Check if a password is provided.
    if (!password)
      return res.status(BAD_REQUEST).json({ message: 'PASSWORD_NOT_FOUND' });

    // Escape special characters in the password and clean it to prevent XSS attacks.
    const escapedPassword: string = escapeSpecialCharacters(password);
    const cleanPassword: string = cleanXSS(escapedPassword);

    // Find the user based on the cleaned email.
    const user = await findUser(cleanEmail);

    // If no user is found, return an 'INVALID_CREDENTIALS' error.
    if (!user)
      return res.status(UNAUTHORIZED).json({ message: 'INVALID_CREDENTIALS' });

    // Compare the provided password with the hashed password stored in the database.
    const isMatch: Promise<boolean> = comparePassword(cleanPassword, user.password);

    // If the passwords don't match, return an 'INVALID_CREDENTIALS' error.
    if (!isMatch)
      return res.status(UNAUTHORIZED).json({ message: 'INVALID_CREDENTIALS' });

    // Generate an authentication token for the user.
    const token = genToken(user._id);

    // Return a successful response with status 'EVERYTHING_OK' and the authentication token.
    return res.status(EVERYTHING_OK).json({ token });
  }
);

/**
 * @method [PATCH]
 */
// This function updates user information based on the request data.
// It is wrapped in an async function to handle asynchronous operations.
export const patchUser = asyncWrapper(
  async (req: AuthenticatedRequest, res: Response) => {
    // Extract relevant data from the request body.
    const { username, password, confirmPassword } = req.body;

    // Check if the user is authenticated.
    if (!req.user)
      return res.status(UNAUTHORIZED).json({ message: 'USER_NO_AUTHENTICATED' });

    // Extract the user ID from the authenticated user.
    const { _id } = req.user;

    // Initialize an empty object to store updated data.
    let newData: object = {};

    // If a new username is provided, sanitize and add it to the newData object.
    if (username) {
      const escapedUsername: string = escapeSpecialCharacters(username);
      const cleanUsername: string = cleanXSS(escapedUsername);
      newData = { ...newData, username: cleanUsername };
    }

    // If a new password is provided, validate it and hash it.
    if (password) {
      // Check if the provided password matches the confirmation.
      if (password !== confirmPassword)
        return res.status(BAD_REQUEST).json({ message: 'PASSWORD_NOT_MATCH' });

      // Validate the password length and complexity.
      if (password.length < 10 || !isValidPassword(password))
        return res.status(BAD_REQUEST).json({ message: 'INVALID_PASSWORD' });

      // Escape special characters in the password and clean it to prevent XSS attacks.
      const escapedPassword: string = escapeSpecialCharacters(password);
      const cleanPassword: string = cleanXSS(escapedPassword);

      // Hash the cleaned password for security.
      const passwordHashed: string = await encryptPassword(cleanPassword);

      // Add the hashed password to the newData object.
      newData = { ...newData, password: passwordHashed };
    }

    // Find and update the user based on the cleaned ID and newData.
    const newUser = await findAndUpdateUser(_id as string, newData);

    // If the update fails, return an 'USER_UPDATE_FAILED' error.
    if (!newUser)
      return res.status(INTERNAL_SERVER_ERROR).json({ message: 'USER_UPDATE_FAILED' });

    // Update the user object in the request context.
    if (newUser)
      req.user = newUser;

    // Return a successful response with status 'CREATED' and an 'updated' flag.
    return res.status(CREATED).json({ updated: true });
  }
);

/**
 * @method [DELETE]
 */
// This function deletes a user account.
// It is wrapped in an async function to handle asynchronous operations.
export const deleteUser = asyncWrapper(
  async (req: AuthenticatedRequest, res: Response) => {
    // Extract the 'confirmUsername' from the request body.
    const { confirmUsername } = req.body;

    // Check if the user is authenticated.
    if (!req.user)
      return res.status(UNAUTHORIZED).json({ message: 'USER_NO_AUTHENTICATED' });

    // Extract the '_id' and 'username' from the authenticated user.
    const { _id, username } = req.user;

    // Compare the provided 'confirmUsername' with the authenticated user's 'username'.
    // If they don't match, return a 'USERNAME_NOT_MATCH' error.
    if (username !== confirmUsername)
      return res.status(BAD_REQUEST).json({ message: 'USERNAME_NOT_MATCH' });

    // Find and delete the user based on the cleaned ID.
    await findAndDeleteUser(_id as string);

    // Clear the user object from the request context.
    req.user = undefined;

    // Return a successful response with status 'NO_CONTENT' and a 'delete' flag.
    return res.status(NO_CONTENT).json({ delete: true });
  }
);

/**
 * @method [GET]
 */
// This function retrieves user information.
// It is wrapped in an async function to handle asynchronous operations.
export const getUser = asyncWrapper(
  async (req: AuthenticatedRequest, res: Response) => {
    // Check if the user is authenticated.
    if (!req.user)
      return res.status(UNAUTHORIZED).json({ message: 'USER_NO_AUTHENTICATED' });

    // Extract relevant data from the authenticated user.
    const { _id, username, email } = req.user;

    // Return a successful response with status 'EVERYTHING_OK' and user details.
    return res.status(EVERYTHING_OK).json({ _id, username, email });
  }
);
