import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingSpinner = ({ 
  size = 'large', 
  color = '#2563eb', 
  style,
  fullScreen = false 
}) => {
  if (fullScreen) {
    return (
      <View style={[styles.fullScreenContainer, style]}>
        <ActivityIndicator size={size} color={color} />
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});

export default LoadingSpinner;