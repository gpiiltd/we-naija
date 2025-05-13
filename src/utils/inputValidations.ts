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

export const formatOperationalDays = (operationalDays: string): string => {
  const daysMap: { [key: string]: string } = {
    monday_to_friday: "Monday - Friday",
    monday_to_saturday: "Monday - Saturday",
    monday_to_sunday: "Monday - Sunday",
    saturday_only: "Saturday only",
    sunday_only: "Sunday only",
    saturday_to_sunday: "Saturday - Sunday",
    friday_to_saturday: "Friday - Saturday",
    friday_to_sunday: "Friday - Sunday",
    thursday_to_friday: "Thursday - Friday",
    thursday_to_saturday: "Thursday - Saturday",
    thursday_to_sunday: "Thursday - Sunday",
  };

  return daysMap[operationalDays.toLowerCase()] || operationalDays;
};

export const capitalizeName = (name: string) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
