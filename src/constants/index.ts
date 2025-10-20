// API Configuration
export const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api' 
  : 'https://your-production-api.com/api';

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME_MODE: 'theme_mode',
} as const;

// Lead Status Options
export const LEAD_STATUSES = [
  { label: 'New', value: 'New' },
  { label: 'Contacted', value: 'Contacted' },
  { label: 'Converted', value: 'Converted' },
  { label: 'Lost', value: 'Lost' },
] as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
} as const;

// Theme Colors
export const COLORS = {
  light: {
    primary: '#6200EE',
    secondary: '#03DAC6',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#000000',
    error: '#B00020',
    success: '#4CAF50',
    warning: '#FF9800',
  },
  dark: {
    primary: '#BB86FC',
    secondary: '#03DAC6',
    background: '#121212',
    surface: '#1E1E1E',
    text: '#FFFFFF',
    error: '#CF6679',
    success: '#4CAF50',
    warning: '#FF9800',
  },
} as const;

// Validation Rules
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s-()]{10,}$/,
} as const;

// Chart Colors
export const CHART_COLORS = [
  '#6200EE',
  '#03DAC6',
  '#FF6F00',
  '#E91E63',
  '#4CAF50',
  '#2196F3',
  '#FF5722',
  '#9C27B0',
] as const;