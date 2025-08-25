import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { authCrud, profileCrud } from '../lib/crud';
import { DEFAULT_USER_LEVEL } from '../lib/constants';

const AuthContext = createContext({
  user: null,
  profile: null,
  session: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  resetPassword: async () => {}
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get user profile when user changes
  const fetchUserProfile = async (userId) => {
    if (!userId) {
      setProfile(null);
      return;
    }

    try {
      const { data: profileData, error } = await profileCrud.getProfile(userId);
      if (error) {
        console.log('❌ Error fetching user profile:', error.message);
        // Don't fail the entire auth process if profile fetch fails
        setProfile(null);
      } else {
        setProfile(profileData);
      }
    } catch (error) {
      console.log('❌ Unexpected error fetching user profile:', error.message);
      // Don't fail the entire auth process if profile fetch fails
      setProfile(null);
    }
  };

  // Validate session and refresh if needed
  const validateAndRefreshSession = async (currentSession) => {
    if (!currentSession) return null;

    try {
      // Check if token is expired
      const now = Math.floor(Date.now() / 1000);
      const expiresAt = currentSession.expires_at;
      
      if (!expiresAt || now >= expiresAt) {
        console.log('⚠️ Session is expired');
        return null;
      }

      // Check if token is about to expire (within 5 minutes)
      const fiveMinutesFromNow = now + (5 * 60);

      if (expiresAt < fiveMinutesFromNow) {
        console.log('🔄 Session expiring soon, refreshing...');
        const { data: { session: refreshedSession }, error } = await supabase.auth.refreshSession();
        
        if (error) {
          console.log('❌ Failed to refresh session:', error.message);
          return null;
        }
        
        console.log('✅ Session refreshed successfully');
        return refreshedSession;
      }

      return currentSession;
    } catch (error) {
      console.log('❌ Error validating/refreshing session:', error.message);
      return null;
    }
  };

  // Initialize auth state
  useEffect(() => {
    let isInitialized = false;
    let timeoutId;

    const initializeAuth = async () => {
      try {
        console.log('🔄 Initializing auth...');
        setLoading(true);
        

        
        // Get initial session
        const { session: initialSession, error: sessionError } = await authCrud.getSession();
        
        if (sessionError) {
          console.log('❌ Error getting initial session:', sessionError.message);
          setSession(null);
          setUser(null);
          setProfile(null);
          isInitialized = true;
          setLoading(false);
          return;
        }
        
        console.log('📋 Initial session found:', !!initialSession, initialSession?.user?.id);
        
        if (initialSession?.user && initialSession?.access_token) {
          // Validate and potentially refresh the session
          const validSession = await validateAndRefreshSession(initialSession);
          
          if (validSession) {
            setSession(validSession);
            setUser(validSession.user);
            
            console.log('👤 Fetching user profile...');
            await fetchUserProfile(validSession.user.id);
            console.log('✅ Auth initialization complete with valid session');
          } else {
            console.log('⚠️ Session validation failed, clearing auth state');
            setSession(null);
            setUser(null);
            setProfile(null);
          }
        } else {
          // No valid session
          console.log('ℹ️ No valid session found');
          setSession(null);
          setUser(null);
          setProfile(null);
        }
        
        isInitialized = true;
        setLoading(false);
      } catch (error) {
        console.log('❌ Error initializing auth:', error.message);
        isInitialized = true;
        setLoading(false);
      }
    };

    // Set a timeout fallback in case initialization gets stuck
    timeoutId = setTimeout(() => {
      if (!isInitialized) {
        console.log('⚠️ Auth initialization timeout - forcing completion');
        isInitialized = true;
        setLoading(false);
      }
    }, 15000); // 15 second timeout

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state changed:', event, session?.user?.id);
        
        // Only handle auth state changes after initial setup
        if (isInitialized) {
          try {
            if (event === 'SIGNED_IN') {
              setSession(session);
              setUser(session?.user || null);
              
              if (session?.user) {
                await fetchUserProfile(session.user.id);
                console.log('✅ User authenticated successfully');
              }
            } else if (event === 'SIGNED_OUT') {
              setSession(null);
              setUser(null);
              setProfile(null);
              console.log('✅ User signed out successfully');
            } else if (event === 'TOKEN_REFRESHED') {
              // Handle token refresh
              setSession(session);
              setUser(session?.user || null);
              console.log('✅ Token refreshed successfully');
            }
            
            setLoading(false);
          } catch (error) {
            console.log('❌ Error handling auth state change:', error.message);
            setLoading(false);
          }
        }
      }
    );

    return () => {
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, []);

  // Sign in function
  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const { data, error } = await authCrud.signIn(email, password);
      
      if (error) {
        setLoading(false);
        return { success: false, error: error.message };
      }
      
      // Don't set loading to false here - let onAuthStateChange handle it
      return { success: true, data };
    } catch (error) {
      console.log('❌ Sign in error:', error.message);
      setLoading(false);
      return { success: false, error: error.message };
    }
  };

  // Sign up function
  const signUp = async (email, password, userLevel = DEFAULT_USER_LEVEL) => {
    try {
      setLoading(true);
      const { data, error } = await authCrud.signUp(email, password, userLevel);
      
      if (error) {
        setLoading(false);
        return { success: false, error: error.message };
      }
      
      setLoading(false);
      return { 
        success: true, 
        data,
        message: 'Registration successful! Please check your email to verify your account.'
      };
    } catch (error) {
      console.log('❌ Sign up error:', error.message);
      setLoading(false);
      return { success: false, error: error.message };
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      console.log('🔄 AuthProvider signOut called');
      setLoading(true);
      
      const { error } = await authCrud.signOut();
      
      // Always clear local state regardless of server response
      // This ensures UI updates immediately even if there are network issues
      setUser(null);
      setSession(null);
      setProfile(null);
      
      if (error) {
        console.log('⚠️ Server sign out failed, but local state cleared:', error.message);
        setLoading(false);
        return { success: false, error: error.message };
      }
      
      console.log('✅ Sign out completed successfully');
      setLoading(false);
      return { success: true };
    } catch (error) {
      console.log('❌ Sign out error:', error.message);
      // Even on error, clear local state to ensure user can't access protected content
      setUser(null);
      setSession(null);
      setProfile(null);
      setLoading(false);
      return { success: false, error: error.message };
    }
  };

  // Reset password function
  const resetPassword = async (email) => {
    try {
      const { data, error } = await authCrud.resetPassword(email);
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { 
        success: true, 
        message: 'Password reset email sent! Please check your inbox.'
      };
    } catch (error) {
      console.log('❌ Reset password error:', error.message);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
