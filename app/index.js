import { Redirect } from 'expo-router';
import { useAuth } from '../components/AuthProvider';

export default function Index() {
  const { user } = useAuth();

  // Redirect to auth if not authenticated, otherwise to tasks
  return <Redirect href={user ? '/(tabs)/tasks' : '/auth'} />;
}
