import { Stack } from 'expo-router';

export default function SleepStackLayout() {

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="welcome" />
            <Stack.Screen name="sleep" />
            <Stack.Screen name="[id]" />
        </Stack>
    );
}