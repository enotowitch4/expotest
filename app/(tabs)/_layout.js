import { Tabs } from 'expo-router';
import { useAuth } from '../../components/AuthProvider';
import { NAVIGATION_ITEMS } from '../../lib/constants';
import { LogOut, User, Home, BarChart3, ClipboardList, UserCheck, Settings } from 'lucide-react-native';
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
        }}
      >
        {NAVIGATION_ITEMS.map((item) => {
          return (
            <Tabs.Screen
              key={item.id}
              name={item.id}
              options={{
                title: item.label,
                tabBarIcon: ({ color, size }) => {
                  // Map icon names to components
                  const iconMap = {
                    'Home': Home,
                    'BarChart3': BarChart3,
                    'ClipboardList': ClipboardList,
                    'UserCheck': UserCheck,
                    'Settings': Settings,
                    'User': User,
                  };
                  const IconComponent = iconMap[item.icon];
                  return IconComponent ? <IconComponent size={size} color={color} /> : null;
                },
              }}
            />
          );
        })}
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
