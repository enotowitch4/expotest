import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LogOut, User, Shield } from 'lucide-react-native';
import { useAuth } from './AuthProvider';
import Button from './ui/shared/Button';

const Dashboard = () => {
  const { user, profile, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    console.log('🔄 Dashboard sign out called');
    const result = await signOut();
    
    if (!result.success) {
      console.log('❌ Sign out failed:', result.error);
    } else {
      console.log('✅ Sign out successful');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.avatarContainer}>
          <User size={32} color="#ffffff" />
        </View>
        <Text style={styles.welcomeTitle}>Welcome!</Text>
        <Text style={styles.welcomeSubtitle}>You are successfully authenticated</Text>
      </View>

      {/* User Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Account Information</Text>
        
        <View style={styles.infoRow}>
          <User size={20} color="#6B7280" />
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{user?.email}</Text>
        </View>
        
        {profile && (
          <View style={styles.infoRow}>
            <Shield size={20} color="#6B7280" />
            <Text style={styles.infoLabel}>User Level:</Text>
            <Text style={[styles.infoValue, styles.userLevel]}>
              {profile.user_level}
            </Text>
          </View>
        )}
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>User ID:</Text>
          <Text style={styles.userIdValue}>
            {user?.id?.substring(0, 8)}...
          </Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <Button
          title={loading ? "Signing Out..." : "Sign Out"}
          onPress={handleSignOut}
          variant="outline"
          icon={!loading && <LogOut size={20} color="#2563eb" />}
          disabled={loading}
          loading={loading}
        />
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
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#10b981',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
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
  infoContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    color: '#6b7280',
    marginLeft: 8,
    flex: 1,
  },
  infoValue: {
    color: '#1f2937',
    fontWeight: '500',
  },
  userLevel: {
    textTransform: 'capitalize',
  },
  userIdValue: {
    color: '#1f2937',
    fontFamily: 'monospace',
    fontSize: 12,
  },
  actionsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 24,
  },
});

export default Dashboard;