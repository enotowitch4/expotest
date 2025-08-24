import React, { useState } from 'react';
import { View, Platform, KeyboardAvoidingView, StyleSheet } from 'react-native';
import Login from './Login';
import Register from './Register';
import { ROUTES } from '../lib/constants';

const Auth = () => {
  const [currentView, setCurrentView] = useState(ROUTES.LOGIN);

  const switchToLogin = () => {
    setCurrentView(ROUTES.LOGIN);
  };

  const switchToRegister = () => {
    setCurrentView(ROUTES.REGISTER);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case ROUTES.LOGIN:
        return <Login onSwitchToRegister={switchToRegister} />;
      case ROUTES.REGISTER:
        return <Register onSwitchToLogin={switchToLogin} />;
      default:
        return <Login onSwitchToRegister={switchToRegister} />;
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <View style={styles.innerContainer}>
        {renderCurrentView()}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  innerContainer: {
    flex: 1,
  },
});

export default Auth;