
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phoneRegex.test(phone);
};

export const isValidRegistrationNumber = (regNumber: string): boolean => {
  const regNumberRegex = /^[A-Z0-9]{6,}$/;
  return regNumberRegex.test(regNumber);
};
