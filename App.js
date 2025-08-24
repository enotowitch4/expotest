import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { QueryProvider } from './components/QueryProvider';
import { AuthProvider, useAuth } from './components/AuthProvider';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import LoadingSpinner from './components/ui/shared/LoadingSpinner';

// Main app content component
const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return user ? <Dashboard /> : <Auth />;
};

export default function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto" />
          <AppContent />
        </SafeAreaView>
      </AuthProvider>
    </QueryProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
});
