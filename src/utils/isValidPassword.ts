// Function to validate a password using a regular expression
export const isValidPassword = (password: string): boolean => {
  // Define a regular expression that matches passwords with the following criteria:
  // - At least one lowercase letter
  // - At least one uppercase letter
  // - At least one digit
  // - At least one special character (@$!%*?&)
  // - At least eight characters long
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    
  // Test the password against the regular expression and return the result
  return regex.test(password);
};  