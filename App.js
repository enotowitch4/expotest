import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { QueryProvider } from './components/QueryProvider';
import { DatabaseTest } from './components/DatabaseTest';

export default function App() {
  return (
    <QueryProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <DatabaseTest />
        <Text>Hello</Text>
      </SafeAreaView>
    </QueryProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
});
