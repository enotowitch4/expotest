import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, StyleSheet } from 'react-native';
import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export function DatabaseTest() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  // Query to fetch all users
  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Query error:', error);
        throw error;
      }
      return data || [];
    },
  });

  // Mutation to insert a new user
  const insertUser = useMutation({
    mutationFn: async (userData) => {
      console.log('Attempting to insert:', userData);
      
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select('*');
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      return data;
    },
    onSuccess: (data) => {
      console.log('Insert success:', data);
      Alert.alert('Success', 'User added successfully!');
      setName('');
      setEmail('');
      setUsername('');
      refetch(); // Refresh the users list
    },
    onError: (error) => {
      console.error('Mutation error:', error);
      Alert.alert('Error', error.message || 'Failed to add user');
    },
  });

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !username.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Send name, email, and username - let Supabase handle created_at
    insertUser.mutate({
      name: name.trim(),
      email: email.trim(),
      username: username.trim(),
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Database Connection Test</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter name"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username:</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
          />
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            insertUser.isPending && styles.buttonDisabled
          ]}
          onPress={handleSubmit}
          disabled={insertUser.isPending}
        >
          <Text style={styles.buttonText}>
            {insertUser.isPending ? 'Adding...' : 'Add User to Database'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>
          Users in Database ({users?.length || 0})
        </Text>
        
        {isLoading ? (
          <Text style={styles.loadingText}>Loading users...</Text>
        ) : users && users.length > 0 ? (
          users.map((user, index) => (
            <View key={user.id || index} style={styles.userItem}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userUsername}>@{user.username}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              <Text style={styles.userDate}>
                {new Date(user.created_at).toLocaleString()}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>
            No users found. Add some users to test the database connection!
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    color: '#374151',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#1f2937',
  },
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 8,
  },

  buttonDisabled: {
    backgroundColor: '#9ca3af',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  loadingText: {
    color: '#6b7280',
    textAlign: 'center',
    paddingVertical: 16,
  },
  emptyText: {
    color: '#6b7280',
    textAlign: 'center',
    paddingVertical: 16,
  },
  userItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 12,
  },
  userName: {
    fontWeight: '600',
    color: '#1f2937',
  },
  userUsername: {
    color: '#3b82f6',
    fontSize: 12,
    marginTop: 2,
  },
  userEmail: {
    color: '#6b7280',
  },
  userDate: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
}); 