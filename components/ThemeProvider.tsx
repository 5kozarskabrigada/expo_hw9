import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import dayjs from 'dayjs';
import { themeConfig } from '@/constants/theme';

type ThemeContextType = {
    theme: 'light' | 'dark';
    colors: typeof themeConfig.light.colors;
    toggleTheme: () => void;
    isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const systemTheme = useColorScheme();
    const [theme, setTheme] = useState<'light' | 'dark'>(systemTheme || 'light');

    const currentHour = dayjs().hour();
    const isNightTime = currentHour >= 18 || currentHour < 6;

    useEffect(() => {

        if (isNightTime) {
            setTheme('dark');
        } else {
            setTheme('light');
        }


        NavigationBar.setBackgroundColorAsync(
            isNightTime
                ? themeConfig.dark.colors.card
                : themeConfig.light.colors.card
        );
    }, [isNightTime]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const value = {
        theme,
        colors: theme === 'light' ? themeConfig.light.colors : themeConfig.dark.colors,
        toggleTheme,
        isDark: theme === 'dark',
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};