import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootNav from './src/navigation/RootNav';
import { Provider } from 'react-redux';
import { persistor, store } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import { useNetwork } from './src/hooks/useNetwork';
import { setupReactQueryOnlineManager } from './src/utils/ReactQueryOnlineManager';
import { useEffect } from 'react';

const queryClient = new QueryClient();

function App() {
  const isConnected = useNetwork();

  useEffect(() => {
    setupReactQueryOnlineManager();
  }, []);

  return (
    <>
      {!isConnected && isConnected !== null && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>No Internet Connection</Text>
        </View>
      )}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <StatusBar translucent backgroundColor="transparent" />
            <NavigationContainer>
              <SafeAreaProvider>
                <RootNav />
              </SafeAreaProvider>
            </NavigationContainer>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: '#FF3B30',
    padding: 12,
    paddingTop: 40,
    zIndex: 100,
  },

  bannerText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500'
  },
});

export default App;
