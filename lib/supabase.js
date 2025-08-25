import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://kfiivcwjqxmzjyflgpdq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmaWl2Y3dqcXhtemp5ZmxncGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMDk5MzcsImV4cCI6MjA2OTU4NTkzN30.EcqisHzhRIVuJqljFHTS9LKwcy6n6l_OwQllWxc3VYY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
  db: {
    schema: 'public'
  }
}); 