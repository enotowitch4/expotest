import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryProvider } from '../components/QueryProvider';
import { AuthProvider, useAuth } from '../components/AuthProvider';
import LoadingSpinner from '../components/ui/shared/LoadingSpinner';

// Root layout component
const RootLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        {user ? (
          // Authenticated routes
          <>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </>
        ) : (
          // Auth routes
          <>
            <Stack.Screen name="auth" options={{ headerShown: false }} />
          </>
        )}
      </Stack>
    </>
  );
};

// Main layout with providers
export default function Layout() {
  return (
    <QueryProvider>
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    </QueryProvider>
  );
}
