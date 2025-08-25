import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../components/AuthProvider';
import { USER_LEVELS } from '../../lib/constants';

export default function AdminPage() {
  const { profile } = useAuth();

  // Check if user has admin access
  const isAdmin = profile?.user_level === USER_LEVELS.ADMIN;

  if (!isAdmin) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Access Denied</Text>
        <Text style={styles.subtitle}>You don't have permission to access this page</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>
      <Text style={styles.subtitle}>Administrative controls and settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
});
