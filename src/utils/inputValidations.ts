export const validatePassword = (password: string): string | undefined => {
  if (!password) {
    return "Password cannot be empty.";
  }
  if (password.length < 5) {
    return "Password must be at least 5 characters long.";
  }
  if (/^[a-zA-Z0-9]*$/.test(password)) {
    return "Password must contain special characters.";
  }
  return ""; // No errors
};

export const validateEmail = (email: string): string | undefined => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
  if (!email) {
    return "Email cannot be empty.";
  }
  if (!emailRegex.test(email)) {
    return "Invalid email format.";
  }
  return ""; // No errors
};
