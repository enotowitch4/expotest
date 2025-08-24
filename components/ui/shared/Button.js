import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator, StyleSheet } from 'react-native';

const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false,
  icon,
  style,
  textStyle,
  ...props 
}) => {
  const isDisabled = disabled || loading;

  const buttonStyle = [
    styles.button,
    styles[`button_${variant}`],
    styles[`button_${size}`],
    isDisabled && styles.buttonDisabled,
    style
  ];

  const buttonTextStyle = [
    styles.text,
    styles[`text_${variant}`],
    styles[`text_${size}`],
    textStyle
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={buttonStyle}
      {...props}
    >
      {loading && (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' || variant === 'ghost' ? '#2563eb' : '#ffffff'} 
          style={styles.loader}
        />
      )}
      {icon && !loading && (
        <View style={styles.iconContainer}>
          {icon}
        </View>
      )}
      <Text style={buttonTextStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Variants
  button_primary: {
    backgroundColor: '#2563eb',
  },
  button_secondary: {
    backgroundColor: '#6b7280',
  },
  button_outline: {
    borderWidth: 2,
    borderColor: '#2563eb',
    backgroundColor: 'transparent',
  },
  button_ghost: {
    backgroundColor: 'transparent',
  },
  // Sizes
  button_sm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  button_md: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  button_lg: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  // Text styles
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  text_primary: {
    color: '#ffffff',
  },
  text_secondary: {
    color: '#ffffff',
  },
  text_outline: {
    color: '#2563eb',
  },
  text_ghost: {
    color: '#1f2937',
  },
  text_sm: {
    fontSize: 14,
  },
  text_md: {
    fontSize: 16,
  },
  text_lg: {
    fontSize: 18,
  },
  // States
  buttonDisabled: {
    opacity: 0.5,
  },
  loader: {
    marginRight: 8,
  },
  iconContainer: {
    marginRight: 8,
  },
});

export default Button;