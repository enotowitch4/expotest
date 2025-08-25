import { supabase } from './supabase';

// Authentication CRUD operations
export const authCrud = {
  // Sign up new user
  signUp: async (email, password, userLevel = 'creator') => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_level: userLevel
          }
        }
      });

      if (error) throw error;

      // Insert user profile data
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              email: data.user.email,
              user_level: userLevel,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ]);

        if (profileError) {
          console.log('❌ Profile creation error:', profileError);
        }
      }

      return { data, error: null };
    } catch (error) {
      console.log('❌ Sign up error:', error.message);
      return { data: null, error };
    }
  },

  // Sign in user
  signIn: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      

      
      return { data, error: null };
    } catch (error) {
      console.log('❌ Sign in error:', error.message);
      return { data: null, error };
    }
  },

  // Sign out user
  signOut: async () => {
    try {
      console.log('🔄 Calling Supabase signOut...');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log('✅ Supabase signOut successful');
      return { error: null };
    } catch (error) {
      console.log('❌ Sign out error:', error.message);
      return { error };
    }
  },

  // Get current session
  getSession: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      

      
      return { session, error: null };
    } catch (error) {
      console.log('❌ Get session error:', error.message);
      return { session: null, error };
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      

      
      return { user, error: null };
    } catch (error) {
      console.log('❌ Get current user error:', error.message);
      return { user: null, error };
    }
  },

  // Refresh session
  refreshSession: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      

      
      return { session, error: null };
    } catch (error) {
      console.log('❌ Refresh session error:', error.message);
      return { session: null, error };
    }
  },

  // Reset password
  resetPassword: async (email) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.log('❌ Reset password error:', error.message);
      return { data: null, error };
    }
  }
};

// User profile CRUD operations
export const profileCrud = {
  // Get user profile
  getProfile: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        // If profiles table doesn't exist, return null data without error
        if (error.message.includes('does not exist')) {
          console.log('⚠️ Profiles table does not exist, skipping profile fetch');
          return { data: null, error: null };
        }
        throw error;
      }
      return { data, error: null };
    } catch (error) {
      console.log('❌ Get profile error:', error.message);
      // If profiles table doesn't exist, return null data without error
      if (error.message.includes('does not exist')) {
        console.log('⚠️ Profiles table does not exist, skipping profile fetch');
        return { data: null, error: null };
      }
      return { data: null, error };
    }
  },

  // Update user profile
  updateProfile: async (userId, updates) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.log('❌ Update profile error:', error.message);
      return { data: null, error };
    }
  },

  // Delete user profile
  deleteProfile: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.log('❌ Delete profile error:', error.message);
      return { data: null, error };
    }
  }
};

// Generic CRUD operations
export const genericCrud = {
  // Create record
  create: async (table, data) => {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert([{
          ...data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select();

      if (error) throw error;
      return { data: result, error: null };
    } catch (error) {
      console.log(`❌ Create ${table} error:`, error.message);
      return { data: null, error };
    }
  },

  // Read records
  read: async (table, filters = {}, options = {}) => {
    try {
      let query = supabase.from(table).select(options.select || '*');

      // Apply filters
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });

      // Apply ordering
      if (options.orderBy) {
        query = query.order(options.orderBy, { ascending: options.ascending !== false });
      }

      // Apply limit
      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.log(`❌ Read ${table} error:`, error.message);
      return { data: null, error };
    }
  },

  // Update records
  update: async (table, id, updates) => {
    try {
      const { data, error } = await supabase
        .from(table)
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.log(`❌ Update ${table} error:`, error.message);
      return { data: null, error };
    }
  },

  // Delete records
  delete: async (table, id) => {
    try {
      const { data, error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.log(`❌ Delete ${table} error:`, error.message);
      return { data: null, error };
    }
  }
};
