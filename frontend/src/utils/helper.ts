export const validateCardNumber = (value: string): boolean => {
  const cleaned = value.replace(/\s/g, "");
  return /^\d{13,19}$/.test(cleaned);
};

export const validateExpiryDate = (value: string): boolean => {
  if (!/^\d{2}\/\d{2}$/.test(value)) return false;
  const [month, year] = value.split("/").map(Number);
  if (month < 1 || month > 12) return false;

  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;
  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;

  return true;
};

export const validateCVC = (value: string): boolean => {
  return /^\d{3,4}$/.test(value);
};

export const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, "");
  return cleaned.replace(/(\d{4})/g, "$1 ").trim();
};

export const formatExpiryDate = (value: string): string => {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length >= 2) {
    return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
  }
  return cleaned;
};
