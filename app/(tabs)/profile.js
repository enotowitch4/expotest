import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useAuth } from '../../components/AuthProvider';
import ProfileCard from '../../components/ui/shared/ProfileCard';
import AccountSettings from '../../components/ui/shared/AccountSettings';

export default function ProfilePage() {
  const { user, profile, signOut } = useAuth();

  const handleAvatarEdit = () => {
    // TODO: Implement avatar editing functionality
    console.log('❌ Avatar edit functionality not implemented yet');
  };

  const handleSettingPress = (setting) => {
    // TODO: Implement settings navigation
    console.log('❌ Setting press functionality not implemented yet:', setting);
  };

  const handleLogout = async () => {
    console.log('🔄 Logout button clicked - logging out immediately');
    await performLogout();
  };

  const performLogout = async () => {
    try {
      console.log('🔄 Performing logout...');
      const result = await signOut();
      
      if (result.success) {
        console.log('✅ Logout successful');
        // The AuthProvider will handle navigation automatically
      } else {
        console.log('❌ Logout failed:', result.error);
      }
    } catch (error) {
      console.log('❌ Logout error:', error.message);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Profile</Text>
      
      <View style={styles.content}>
        <ProfileCard 
          user={user}
          profile={profile}
          onAvatarEdit={handleAvatarEdit}
          style={styles.profileCard}
        />
        
        <View style={styles.separator} />
        
        <AccountSettings 
          onSettingPress={handleSettingPress}
          onLogout={handleLogout}
          style={styles.accountSettings}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#fce7f3',
    marginVertical: 16,
  },
  accountSettings: {
    marginBottom: 20,
  },
});
