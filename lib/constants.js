// App Routes
export const ROUTES = {
  AUTH: 'auth',
  LOGIN: 'login',
  REGISTER: 'register',
  MAIN: 'main',
  DASHBOARD: 'dashboard',
  WELCOME: 'welcome',
  PROFILE: 'profile',
  TASKS: 'tasks',
  STATS: 'stats',
  MANAGE: 'manage',
  CREATOR_INFO: 'creator-info',
  ADMIN: 'admin'
};

// Expo Router Paths
export const ROUTER_PATHS = {
  AUTH: '/auth',
  WELCOME: '/(tabs)/welcome',
  PROFILE: '/(tabs)/profile',
  ADMIN: '/(tabs)/admin',
  TASKS: '/(tabs)/tasks',
  STATS: '/(tabs)/stats',
  MANAGE: '/(tabs)/manage',
  CREATOR_INFO: '/(tabs)/creator-info',
};

// Navigation Items - All available items
export const ALL_NAVIGATION_ITEMS = [
  { id: ROUTES.WELCOME, label: 'Welcome', icon: 'Home' },
  { id: ROUTES.TASKS, label: 'Tasks', icon: 'ClipboardList' },
  { id: ROUTES.STATS, label: 'Stats', icon: 'BarChart3' },
  { id: ROUTES.MANAGE, label: 'Manage', icon: 'ListTodo' },
  { id: ROUTES.CREATOR_INFO, label: 'Creator Info', icon: 'UserCheck' },
  { id: ROUTES.ADMIN, label: 'Admin', icon: 'Settings' },
  { id: ROUTES.PROFILE, label: 'Profile', icon: 'User' }
];

// Creator navigation items (limited access)
export const CREATOR_NAVIGATION_ITEMS = [
  { id: ROUTES.WELCOME, label: 'Welcome', icon: 'Home' },
  { id: ROUTES.TASKS, label: 'Tasks', icon: 'ClipboardList' },
  { id: ROUTES.PROFILE, label: 'Profile', icon: 'User' }
];

// Legacy navigation items (for backward compatibility)
export const NAVIGATION_ITEMS = ALL_NAVIGATION_ITEMS;

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
