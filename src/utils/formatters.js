// Format date to Italian format
export const formatDate = (date, includeTime = false) => {
  if (!date) return '';
  const d = new Date(date);
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }
  return d.toLocaleDateString('it-IT', options);
};

// Format currency
export const formatCurrency = (amount, currency = 'EUR') => {
  if (!amount && amount !== 0) return '€0.00';
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Format phone number
export const formatPhone = (phone) => {
  if (!phone) return '';
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  // Format as +39 XXX XXXXXXX
  if (cleaned.startsWith('39')) {
    return `+39 ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`;
  }
  return `+39 ${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
};

// Format codice fiscale
export const formatCodiceFiscale = (cf) => {
  if (!cf) return '';
  return cf.toUpperCase();
};

// Capitalize first letter
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Truncate text
export const truncate = (str, maxLength = 50) => {
  if (!str || str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
};

// Format file size
export const formatFileSize = (bytes) => {
  if (!bytes) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

// Format percentage
export const formatPercentage = (value, decimals = 0) => {
  if (!value && value !== 0) return '0%';
  return `${value.toFixed(decimals)}%`;
};

// Format booking code
export const formatBookingCode = (code) => {
  if (!code) return '';
  return code.toUpperCase().replace(/(.{4})/g, '$1-').slice(0, -1);
};

// Format card number (mask)
export const formatCardNumber = (number) => {
  if (!number) return '';
  const cleaned = number.replace(/\s/g, '');
  return `**** **** **** ${cleaned.slice(-4)}`;
};

export default {
  formatDate,
  formatCurrency,
  formatPhone,
  formatCodiceFiscale,
  capitalize,
  truncate,
  formatFileSize,
  formatPercentage,
  formatBookingCode,
  formatCardNumber,
};