import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { Mail, Lock } from 'lucide-react-native';
import { useAuth } from './AuthProvider';
import Input from './ui/shared/Input';
import Button from './ui/shared/Button';
import { AUTH_CONFIG } from '../lib/constants';

const Login = ({ onSwitchToRegister }) => {
  const { signIn, resetPassword, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < AUTH_CONFIG.MIN_PASSWORD_LENGTH) {
      return `Password must be at least ${AUTH_CONFIG.MIN_PASSWORD_LENGTH} characters`;
    }
    return '';
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    newErrors.email = validateEmail(formData.email);
    newErrors.password = validatePassword(formData.password);
    
    // Remove empty errors
    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key]) delete newErrors[key];
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Handle login
  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const result = await signIn(formData.email, formData.password);
      
      if (!result.success) {
        Alert.alert('Login Failed', result.error);
        setIsLoading(false);
      } else {
        // Success - the AuthProvider's onAuthStateChange will handle the redirect
        // Keep loading state until the component unmounts (user gets redirected)
      }
    } catch (error) {
      Alert.alert('Login Failed', 'An unexpected error occurred. Please try again.');
      console.log('❌ Login error:', error.message);
      setIsLoading(false);
    }
  };

  // Handle forgot password
  const handleForgotPassword = async () => {
    if (!formData.email) {
      Alert.alert('Email Required', 'Please enter your email address to reset your password.');
      return;
    }

    const emailError = validateEmail(formData.email);
    if (emailError) {
      Alert.alert('Invalid Email', emailError);
      return;
    }

    try {
      const result = await resetPassword(formData.email);
      
      if (result.success) {
        Alert.alert('Success', result.message);
      } else {
        Alert.alert('Error', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to send reset password email. Please try again.');
      console.log('❌ Reset password error:', error.message);
    }
  };

  const isFormLoading = loading || isLoading;

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>LOGO</Text>
        </View>
        <Text style={styles.welcomeTitle}>Welcome Back</Text>
        <Text style={styles.welcomeSubtitle}>Sign in to your account</Text>
      </View>

      {/* Login Form */}
      <View style={styles.formContainer}>
        {/* Email Input */}
        <Input
          label="Email"
          placeholder="Enter your email"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          leftIcon={<Mail size={20} color="#6B7280" />}
          disabled={isFormLoading}
          style={styles.inputSpacing}
        />

        {/* Password Input */}
        <Input
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChangeText={(value) => handleInputChange('password', value)}
          error={errors.password}
          secureTextEntry
          leftIcon={<Lock size={20} color="#6B7280" />}
          disabled={isFormLoading}
          style={styles.inputSpacing}
        />

        {/* Forgot Password */}
        <TouchableOpacity 
          onPress={handleForgotPassword}
          disabled={isFormLoading}
          style={styles.forgotPasswordContainer}
        >
          <Text style={styles.forgotPasswordText}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        {/* Login Button */}
        <Button
          title="Sign In"
          onPress={handleLogin}
          loading={isFormLoading}
          disabled={isFormLoading}
          style={styles.loginButton}
        />

        {/* Switch to Register */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Don't have an account? </Text>
          <TouchableOpacity 
            onPress={onSwitchToRegister}
            disabled={isFormLoading}
          >
            <Text style={styles.switchLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    width: 96,
    height: 96,
    backgroundColor: '#2563eb',
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    color: '#6b7280',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
  },
  inputSpacing: {
    marginBottom: 16,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    marginBottom: 24,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchText: {
    color: '#6b7280',
  },
  switchLink: {
    color: '#2563eb',
    fontWeight: '500',
  },
});

export default Login;