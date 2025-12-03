// API
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Auth
export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';

// Roles
export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  TENANT_ADMIN: 'TENANT_ADMIN',
  STAFF: 'STAFF',
  CUSTOMER: 'CUSTOMER',
};

// Booking Stati
export const BOOKING_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PAID: 'PAID',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
};

// Ombrellone Types
export const OMBRELLONE_TYPES = {
  STANDARD: 'STANDARD',
  PREMIUM: 'PREMIUM',
  VIP: 'VIP',
  FAMILY: 'FAMILY',
};

// Payment Methods
export const PAYMENT_METHODS = {
  CARTA: 'CARTA',
  CONTANTI: 'CONTANTI',
  BONIFICO: 'BONIFICO',
  PAYPAL: 'PAYPAL',
  STRIPE: 'STRIPE',
};

// Prezzi Base (€/giorno)
export const BASE_PRICES = {
  STANDARD: 25,
  PREMIUM: 35,
  VIP: 50,
  FAMILY: 40,
};

// Booking Types
export const BOOKING_TYPES = {
  GIORNALIERA: 'GIORNALIERA',
  SETTIMANALE: 'SETTIMANALE',
  MENSILE: 'MENSILE',
  STAGIONALE: 'STAGIONALE',
};

// Date Formats
export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATETIME_FORMAT = 'DD/MM/YYYY HH:mm';

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export default {
  API_BASE_URL,
  TOKEN_KEY,
  USER_KEY,
  ROLES,
  BOOKING_STATUS,
  OMBRELLONE_TYPES,
  PAYMENT_METHODS,
  BASE_PRICES,
  BOOKING_TYPES,
  DATE_FORMAT,
  DATETIME_FORMAT,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
};