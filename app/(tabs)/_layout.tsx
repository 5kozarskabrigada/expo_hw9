import { Tabs } from 'expo-router';
import { useTheme } from '../../components/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    const { colors } = useTheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.text,
                tabBarStyle: {
                    backgroundColor: colors.card,
                    borderTopColor: colors.border,
                    height: 80,
                    paddingBottom: 10
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginTop: 5
                }
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="sleep"
                options={{
                    title: 'Sleep',
                    href: '/sleep/welcome',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? "moon" : "moon-outline"} size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="meditate"
                options={{
                    title: 'Meditate',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="leaf" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="music"
                options={{
                    title: 'Music',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="musical-notes" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}