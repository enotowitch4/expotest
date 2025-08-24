// App Routes
export const ROUTES = {
  AUTH: 'auth',
  LOGIN: 'login',
  REGISTER: 'register',
  MAIN: 'main',
  DASHBOARD: 'dashboard',
  PROFILE: 'profile'
};

// User Levels/Roles
export const USER_LEVELS = {
  ADMIN: 'admin',
  EXECUTIVE: 'executive', 
  MANAGER: 'manager',
  CREATOR: 'creator'
};

// User Level Hierarchy (higher number = higher permissions)
export const USER_LEVEL_HIERARCHY = {
  [USER_LEVELS.CREATOR]: 1,
  [USER_LEVELS.MANAGER]: 2,
  [USER_LEVELS.EXECUTIVE]: 3,
  [USER_LEVELS.ADMIN]: 4
};

// Default user level for new registrations
export const DEFAULT_USER_LEVEL = USER_LEVELS.CREATOR;

// Authentication constants
export const AUTH_CONFIG = {
  MIN_PASSWORD_LENGTH: 6,
  SESSION_TIMEOUT: 3600000, // 1 hour in milliseconds
  AUTO_REFRESH_THRESHOLD: 60000 // 1 minute in milliseconds
};
