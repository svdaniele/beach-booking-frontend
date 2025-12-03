// Calculate days between two dates
export const calculateDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
};

// Format currency
export const formatCurrency = (amount, currency = '€') => {
  return `${currency}${amount.toFixed(2)}`;
};

// Get status color class
export const getStatusColor = (status) => {
  const colors = {
    CONFIRMED: 'bg-green-100 text-green-700',
    PENDING: 'bg-yellow-100 text-yellow-700',
    PAID: 'bg-blue-100 text-blue-700',
    COMPLETED: 'bg-purple-100 text-purple-700',
    CANCELLED: 'bg-red-100 text-red-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
};

// Get ombrellone type color
export const getOmbrelloneColor = (tipo) => {
  const colors = {
    VIP: 'bg-purple-100 text-purple-700',
    PREMIUM: 'bg-blue-100 text-blue-700',
    FAMILY: 'bg-green-100 text-green-700',
    STANDARD: 'bg-gray-100 text-gray-700',
  };
  return colors[tipo] || colors.STANDARD;
};

// Generate random ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9).toUpperCase();
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Group array by key
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
};

// Sort array by key
export const sortBy = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    if (order === 'asc') {
      return aVal > bVal ? 1 : -1;
    }
    return aVal < bVal ? 1 : -1;
  });
};

// Check if date is in past
export const isDatePast = (date) => {
  return new Date(date) < new Date();
};

// Check if date is today
export const isToday = (date) => {
  const today = new Date();
  const checkDate = new Date(date);
  return checkDate.toDateString() === today.toDateString();
};

export default {
  calculateDays,
  formatCurrency,
  getStatusColor,
  getOmbrelloneColor,
  generateId,
  debounce,
  groupBy,
  sortBy,
  isDatePast,
  isToday,
};