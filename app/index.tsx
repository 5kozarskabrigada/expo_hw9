import { Redirect, useRootNavigationState } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '@/components/ThemeProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function Index() {
    const { user, isLoading } = useAuth();
    const { colors } = useTheme();
    const [onboardingComplete, setOnboardingComplete] = useState(false);
    const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(true);
    const navigationState = useRootNavigationState();

    useEffect(() => {
        if (!navigationState?.key) return;

        const checkOnboarding = async () => {
            const reminders = await AsyncStorage.getItem('reminders');
            if (reminders) {
                setOnboardingComplete(true);
            }
            setIsCheckingOnboarding(false);
        };

        checkOnboarding();
    }, [navigationState?.key]);

    if (isLoading || isCheckingOnboarding) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    if (!user) {
        return <Redirect href="/(auth)/welcome" />;
    }

    if (!onboardingComplete) {
        return <Redirect href="/(onboarding)/welcome" />;
    }

    return <Redirect href="/(tabs)/home" />;
}