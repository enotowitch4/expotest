import { router } from 'expo-router';
import { ROUTER_PATHS } from './constants';

// Navigation utility functions
export const navigateTo = {
  auth: () => router.push(ROUTER_PATHS.AUTH),
  profile: () => router.push(ROUTER_PATHS.PROFILE),
  admin: () => router.push(ROUTER_PATHS.ADMIN),
  tasks: () => router.push(ROUTER_PATHS.TASKS),
  stats: () => router.push(ROUTER_PATHS.STATS),
  manage: () => router.push(ROUTER_PATHS.MANAGE),
  creatorInfo: () => router.push(ROUTER_PATHS.CREATOR_INFO),
  back: () => router.back(),
  replace: (path) => router.replace(path),
};

// Navigation with parameters
export const navigateWithParams = (path, params) => {
  router.push({
    pathname: path,
    params,
  });
};

// Replace current route
export const replaceRoute = (path) => {
  router.replace(path);
};
