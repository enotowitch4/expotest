import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Shield } from 'lucide-react-native';
import ProfileAvatar from './ProfileAvatar';
import { useAuth } from '../../AuthProvider';

const ProfileCard = ({ 
  user, 
  profile, 
  onAvatarEdit,
  style 
}) => {
  const { isAdmin } = useAuth();

  const getUserName = () => {
    if (profile?.full_name) return profile.full_name;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  const getUserRole = () => {
    // Check if user is admin by email first (this takes precedence)
    if (isAdmin()) return 'Administrator';
    if (profile?.user_level === 'admin') return 'Administrator';
    if (profile?.user_level === 'creator') return 'Creator';
    return 'User';
  };

  const getRoleDescription = () => {
    // Check if user is admin by email first (this takes precedence)
    if (isAdmin()) return 'Full access to all features and settings';
    if (profile?.user_level === 'admin') return 'Full access to all features and settings';
    if (profile?.user_level === 'creator') return 'Access to content creation and management';
    return 'Basic user access';
  };

  return (
    <View style={[styles.container, style]}>
      <ProfileAvatar 
        imageUri={profile?.avatar_url}
        size={120}
        onEditPress={onAvatarEdit}
        style={styles.avatar}
      />
      
      <Text style={styles.name}>{getUserName()}</Text>
      <Text style={styles.email}>{user?.email || 'No email provided'}</Text>
      <Text style={styles.description}>{getRoleDescription()}</Text>
      
      <View style={styles.roleBadge}>
        <View style={styles.iconContainer}>
          <Shield size={16} color="#ec4899" />
        </View>
        <Text style={styles.roleText}>{getUserRole()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatar: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fdf2f8',
    borderWidth: 1,
    borderColor: '#fce7f3',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  roleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ec4899',
  },
  iconContainer: {
    marginRight: 8,
  },
});

export default ProfileCard;
