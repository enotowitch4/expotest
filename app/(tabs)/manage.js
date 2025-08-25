import { View, Text, StyleSheet } from 'react-native';

export default function ManagePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage</Text>
      <Text style={styles.subtitle}>Project and team management</Text>
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
