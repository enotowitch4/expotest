import { Tabs } from 'expo-router';
import { useAuth } from '../../components/AuthProvider';
import { useAdminAccess } from '../../components/useAdminAccess';
import { LogOut, User, Home, BarChart3, ClipboardList, UserCheck, Settings, ListTodo } from 'lucide-react-native';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/ui/shared/Button';

// Custom header component with logout
const CustomHeader = () => {
  const { user, signOut, loading } = useAuth();

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
    <View style={styles.header}>
      <View style={styles.userInfo}>
        <User size={20} color="#666" />
        <Text style={styles.userEmail}>{user?.email || 'User'}</Text>
      </View>
      <Button 
        onPress={handleSignOut}
        disabled={loading}
        style={styles.logoutButton}
      >
        <LogOut size={16} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </Button>
    </View>
  );
};

export default function TabsLayout() {
  const { user, loading } = useAuth();
  const { isAdmin } = useAdminAccess();

  return (
    <>
      <CustomHeader />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#e9ecef',
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          tabBarActiveTintColor: '#3b82f6',
          tabBarInactiveTintColor: '#6b7280',
          tabBarIconStyle: {
            marginBottom: 0,
          },
          tabBarLabelStyle: {
            marginTop: 0,
            fontSize: 12,
          },
        }}
      >
        {/* Always visible tabs for all users */}
        <Tabs.Screen
          name="welcome"
          options={{
            title: 'Welcome',
            tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="tasks"
          options={{
            title: 'Tasks',
            tabBarIcon: ({ color, size }) => <ClipboardList size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
          }}
        />

        {/* Admin-only tabs - always defined but conditionally visible */}
        <Tabs.Screen
          name="stats"
          options={{
            title: 'Stats',
            tabBarIcon: ({ color, size }) => <BarChart3 size={size} color={color} />,
            tabBarButton: (!loading && isAdmin && user?.email) ? undefined : () => null,
          }}
        />
        <Tabs.Screen
          name="manage"
          options={{
            title: 'Manage',
            tabBarIcon: ({ color, size }) => <ListTodo size={size} color={color} />,
            tabBarButton: (!loading && isAdmin && user?.email) ? undefined : () => null,
          }}
        />
        <Tabs.Screen
          name="creator-info"
          options={{
            title: 'Creator Info',
            tabBarIcon: ({ color, size }) => <UserCheck size={size} color={color} />,
            tabBarButton: (!loading && isAdmin && user?.email) ? undefined : () => null,
          }}
        />
        <Tabs.Screen
          name="admin"
          options={{
            title: 'Admin',
            tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
            tabBarButton: (!loading && isAdmin && user?.email) ? undefined : () => null,
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#dc3545',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
