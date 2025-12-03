// Email validation
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Phone validation (Italian format)
export const isValidPhone = (phone) => {
  const regex = /^(\+39)?[\s]?([0-9]{2,4})[\s]?([0-9]{6,8})$/;
  return regex.test(phone);
};

// Codice Fiscale validation
export const isValidCodiceFiscale = (cf) => {
  if (!cf || cf.length !== 16) return false;
  const regex = /^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/;
  return regex.test(cf.toUpperCase());
};

// Partita IVA validation
export const isValidPartitaIva = (piva) => {
  if (!piva || piva.length !== 11) return false;
  return /^[0-9]{11}$/.test(piva);
};

// Password validation
export const isValidPassword = (password) => {
  return password && password.length >= 8;
};

// Date validation
export const isValidDate = (date) => {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
};

// Check if date is in future
export const isFutureDate = (date) => {
  return new Date(date) > new Date();
};

// Check if end date is after start date
export const isValidDateRange = (startDate, endDate) => {
  return new Date(endDate) > new Date(startDate);
};

// CAP validation (Italian postal code)
export const isValidCAP = (cap) => {
  return /^[0-9]{5}$/.test(cap);
};

// Required field validation
export const isRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

// Min length validation
export const minLength = (value, min) => {
  return value && value.length >= min;
};

// Max length validation
export const maxLength = (value, max) => {
  return value && value.length <= max;
};

// Number range validation
export const inRange = (value, min, max) => {
  const num = Number(value);
  return num >= min && num <= max;
};

export default {
  isValidEmail,
  isValidPhone,
  isValidCodiceFiscale,
  isValidPartitaIva,
  isValidPassword,
  isValidDate,
  isFutureDate,
  isValidDateRange,
  isValidCAP,
  isRequired,
  minLength,
  maxLength,
  inRange,
};