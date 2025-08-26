import { useAuth } from './AuthProvider';

/**
 * Custom hook for admin access checks
 * @returns {Object} Object containing admin status and user info
 */
export const useAdminAccess = () => {
  const { isAdmin, user, profile } = useAuth();
  
  return {
    isAdmin: isAdmin(),
    user,
    profile,
    hasAdminAccess: isAdmin(),
    userEmail: user?.email,
    userLevel: profile?.user_level
  };
};
