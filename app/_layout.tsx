import { RootSiblingParent } from 'react-native-root-siblings';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useColorScheme } from '@/components/useColorScheme';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { clearAllAsyncStorage } from '@/storage/asyncstorage';
import { PaperProvider } from 'react-native-paper';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'login',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter: require('../assets/fonts/Inter-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <RootSiblingParent>
    <SafeAreaProvider>
    <PaperProvider>
      <Stack screenOptions={{animation: 'ios'}}>
        <Stack.Screen name="login" options={{ headerShown: true, headerTitle: '', headerRight: () =>  <FontAwesome onPress={clearAllAsyncStorage} name="trash" size={28} color="red" /> }} />
        <Stack.Screen name="(adminTabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(carrierTabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(userTabs)" options={{ headerShown: false }} />
        <Stack.Screen name="selectProduct" options={{ headerShown: true, headerTitle: '', }} />
        <Stack.Screen name="lastLocation" options={{ headerShown: true, headerTitle: '', }} />
       {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
      </Stack>
      </PaperProvider>
    </SafeAreaProvider>
    </RootSiblingParent> 
    </ThemeProvider>
  );
}
