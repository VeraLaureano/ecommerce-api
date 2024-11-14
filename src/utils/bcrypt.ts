// Import the 'bcrypt' module
import bcrypt from 'bcrypt';

// Asynchronous function that encrypts a password using bcrypt
export const encryptPassword = async (password: string): Promise<string> => {
  // Define the number of salt rounds
  const saltRounds = 10;

  // Generate a hashed password using bcrypt
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Return the hashed password
  return hashedPassword;
};

// Asynchronous function that compares a password with a hashed password using bcrypt
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  // Compare the password with the hashed password using bcrypt
  const isMatch = await bcrypt.compare(password, hashedPassword);

  // Return whether the password matches the hashed password
  return isMatch;
};
