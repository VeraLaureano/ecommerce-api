// Import the compare function from the bcrypt module
import { compare } from 'bcrypt';

// Define a function to compare a password with a hash
export const compareHashes = async (password: string, hash: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    // Call the compare function with the password and hash
    compare(password, hash, (err, result) => {
      if (err) {
        // Reject the promise if there is an error
        reject(err);
      } else {
        // Resolve the promise with the boolean result
        resolve(result);
      }
    });
  });
};
