import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../components/AuthProvider';

export default function ProfilePage() {
  const { user, profile } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email || 'N/A'}</Text>
        
        <Text style={styles.label}>User Level:</Text>
        <Text style={styles.value}>{profile?.user_level || 'N/A'}</Text>
        
        <Text style={styles.label}>Created:</Text>
        <Text style={styles.value}>
          {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileInfo: {
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  value: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
});
