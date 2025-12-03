// LocalStorage helpers with error handling

// Get item from storage
export const getItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error getting item ${key}:`, error);
    return null;
  }
};

// Set item in storage
export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error setting item ${key}:`, error);
    return false;
  }
};

// Remove item from storage
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing item ${key}:`, error);
    return false;
  }
};

// Clear all storage
export const clearStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
};

// Check if key exists
export const hasItem = (key) => {
  return localStorage.getItem(key) !== null;
};

// Get multiple items
export const getItems = (keys) => {
  return keys.reduce((acc, key) => {
    acc[key] = getItem(key);
    return acc;
  }, {});
};

// Set multiple items
export const setItems = (items) => {
  Object.entries(items).forEach(([key, value]) => {
    setItem(key, value);
  });
};

// Remove multiple items
export const removeItems = (keys) => {
  keys.forEach(key => removeItem(key));
};

export default {
  getItem,
  setItem,
  removeItem,
  clearStorage,
  hasItem,
  getItems,
  setItems,
  removeItems,
};