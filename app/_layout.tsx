// In app/_layout.tsx

import { Stack } from 'expo-router';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthProvider } from '../context/AuthContext';     

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Stack screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}>
          {/* 
          */}
          <Stack.Screen
            name="(auth)"
            options={{
              animation: 'slide_from_right'
            }}
          />
          <Stack.Screen
            name="(onboarding)"
            options={{
              animation: 'slide_from_right'
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              animation: 'fade'
            }}
          />
          {/* */}
          <Stack.Screen name="course/[id]" options={{ presentation: 'modal' }} />
          {/* */}
          <Stack.Screen name="player/[id]" options={{ presentation: 'fullScreenModal' }} />
          {/* */}
          <Stack.Screen name="sleep-player/[id]" options={{ presentation: 'fullScreenModal' }} />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}