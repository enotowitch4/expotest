import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Mail, Lock, Shield } from 'lucide-react-native';
import { useAuth } from './AuthProvider';
import Input from './ui/shared/Input';
import Button from './ui/shared/Button';
import { AUTH_CONFIG, USER_LEVELS, DEFAULT_USER_LEVEL } from '../lib/constants';

const Register = ({ onSwitchToLogin }) => {
  const { signUp, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    userLevel: DEFAULT_USER_LEVEL
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
    if (!/(?=.*[a-z])/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'Password must contain at least one number';
    }
    return '';
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return 'Please confirm your password';
    if (confirmPassword !== password) return 'Passwords do not match';
    return '';
  };

  const validateUserLevel = (userLevel) => {
    if (!userLevel) return 'Please select a user level';
    if (!Object.values(USER_LEVELS).includes(userLevel)) {
      return 'Please select a valid user level';
    }
    return '';
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    newErrors.email = validateEmail(formData.email);
    newErrors.password = validatePassword(formData.password);
    newErrors.confirmPassword = validateConfirmPassword(formData.confirmPassword, formData.password);
    newErrors.userLevel = validateUserLevel(formData.userLevel);
    
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

    // Also validate confirm password when password changes
    if (field === 'password' && errors.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: ''
      }));
    }
  };

  // Handle registration
  const handleRegister = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const result = await signUp(formData.email, formData.password, formData.userLevel);
      
      if (result.success) {
        // Check if user is immediately authenticated (no email confirmation required)
        if (result.data?.user && result.data?.session) {
          // User is immediately authenticated - keep loading until AuthProvider redirects to Dashboard
          // The onAuthStateChange listener will handle the redirect automatically
        } else {
          // Email confirmation required - show message and redirect to login
          Alert.alert(
            'Registration Successful',
            'Please check your email to verify your account before signing in.',
            [{ text: 'OK', onPress: () => { onSwitchToLogin(); setIsLoading(false); } }]
          );
        }
      } else {
        Alert.alert('Registration Failed', result.error);
        setIsLoading(false);
      }
    } catch (error) {
      Alert.alert('Registration Failed', 'An unexpected error occurred. Please try again.');
      console.log('❌ Registration error:', error.message);
      setIsLoading(false);
    }
  };

  // User level options
  const userLevelOptions = [
    { value: USER_LEVELS.CREATOR, label: 'Creator', description: 'Basic user with content creation abilities' },
    { value: USER_LEVELS.MANAGER, label: 'Manager', description: 'Team management and project oversight' },
    { value: USER_LEVELS.EXECUTIVE, label: 'Executive', description: 'Strategic oversight and decision making' },
    { value: USER_LEVELS.ADMIN, label: 'Admin', description: 'Full system administration access' }
  ];

  const isFormLoading = loading || isLoading;

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.innerContainer}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>LOGO</Text>
          </View>
          <Text style={styles.welcomeTitle}>Create Account</Text>
          <Text style={styles.welcomeSubtitle}>Join us today and get started</Text>
        </View>

        {/* Registration Form */}
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

          {/* Confirm Password Input */}
          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChangeText={(value) => handleInputChange('confirmPassword', value)}
            error={errors.confirmPassword}
            secureTextEntry
            leftIcon={<Lock size={20} color="#6B7280" />}
            disabled={isFormLoading}
            style={styles.inputSpacing}
          />

          {/* User Level Selection */}
          <View style={styles.userLevelContainer}>
            <View style={styles.userLevelHeader}>
              <Shield size={16} color="#6B7280" />
              <Text style={styles.userLevelTitle}>User Level</Text>
            </View>
            {userLevelOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => handleInputChange('userLevel', option.value)}
                disabled={isFormLoading}
                style={[
                  styles.userLevelOption,
                  formData.userLevel === option.value && styles.userLevelOptionSelected
                ]}
              >
                <View style={styles.userLevelContent}>
                  <View style={styles.userLevelTextContainer}>
                    <Text style={[
                      styles.userLevelLabel,
                      formData.userLevel === option.value && styles.userLevelLabelSelected
                    ]}>
                      {option.label}
                    </Text>
                    <Text style={[
                      styles.userLevelDescription,
                      formData.userLevel === option.value && styles.userLevelDescriptionSelected
                    ]}>
                      {option.description}
                    </Text>
                  </View>
                  {formData.userLevel === option.value && (
                    <View style={styles.selectedIndicator}>
                      <View style={styles.selectedDot} />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
            {errors.userLevel && (
              <Text style={styles.errorText}>
                {errors.userLevel}
              </Text>
            )}
          </View>

          {/* Register Button */}
          <Button
            title="Create Account"
            onPress={handleRegister}
            loading={isFormLoading}
            disabled={isFormLoading}
            style={styles.registerButton}
          />

          {/* Switch to Login */}
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Already have an account? </Text>
            <TouchableOpacity 
              onPress={onSwitchToLogin}
              disabled={isFormLoading}
            >
              <Text style={styles.switchLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    flexGrow: 1,
  },
  innerContainer: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
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
  userLevelContainer: {
    marginBottom: 24,
  },
  userLevelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userLevelTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginLeft: 4,
  },
  userLevelOption: {
    padding: 16,
    marginBottom: 8,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
  },
  userLevelOptionSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#dbeafe',
  },
  userLevelContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userLevelTextContainer: {
    flex: 1,
  },
  userLevelLabel: {
    fontWeight: '500',
    fontSize: 16,
    color: '#1f2937',
  },
  userLevelLabelSelected: {
    color: '#1d4ed8',
  },
  userLevelDescription: {
    fontSize: 14,
    marginTop: 4,
    color: '#6b7280',
  },
  userLevelDescriptionSelected: {
    color: '#2563eb',
  },
  selectedIndicator: {
    width: 20,
    height: 20,
    backgroundColor: '#2563eb',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDot: {
    width: 8,
    height: 8,
    backgroundColor: '#ffffff',
    borderRadius: 4,
  },
  errorText: {
    fontSize: 14,
    color: '#ef4444',
    marginTop: 4,
  },
  registerButton: {
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

export default Register;