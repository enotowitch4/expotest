import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { 
  Lock, 
  Settings, 
  Bell, 
  HelpCircle, 
  LogOut 
} from 'lucide-react-native';

const AccountSettings = ({ 
  onSettingPress,
  onLogout,
  style 
}) => {
  const settings = [
    {
      id: 'password',
      title: 'Change Password',
      icon: Lock,
      onPress: () => onSettingPress('password'),
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: Settings,
      onPress: () => onSettingPress('settings'),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      onPress: () => onSettingPress('notifications'),
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: HelpCircle,
      onPress: () => onSettingPress('help'),
    },
    {
      id: 'logout',
      title: 'Logout',
      icon: LogOut,
      onPress: () => {
        console.log('🔄 Logout button pressed');
        onLogout();
      },
      isLogout: true,
    },
  ];

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.sectionTitle}>Account</Text>
      
      {settings.map((setting, index) => (
        <React.Fragment key={setting.id}>
          <TouchableOpacity 
            style={styles.settingItem} 
            onPress={setting.onPress}
          >
            <View style={styles.settingContent}>
              <View style={styles.iconContainer}>
                <setting.icon 
                  size={20} 
                  color={setting.isLogout ? '#ec4899' : '#6b7280'} 
                />
              </View>
              <Text style={[
                styles.settingText,
                setting.isLogout && styles.logoutText
              ]}>
                {setting.title}
              </Text>
            </View>
          </TouchableOpacity>
          
          {index < settings.length - 1 && (
            <View style={styles.separator} />
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  settingItem: {
    paddingVertical: 12,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
  iconContainer: {
    marginRight: 12,
  },
  logoutText: {
    color: '#ec4899',
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginVertical: 4,
  },
});

export default AccountSettings;
