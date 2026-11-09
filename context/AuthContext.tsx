import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { Session } from '@supabase/supabase-js';

const tokenStorage = {
    getItemAsync: (key: string) =>
        Platform.OS === 'web' ? AsyncStorage.getItem(key) : SecureStore.getItemAsync(key),
    setItemAsync: (key: string, value: string) =>
        Platform.OS === 'web' ? AsyncStorage.setItem(key, value) : SecureStore.setItemAsync(key, value),
    deleteItemAsync: (key: string) =>
        Platform.OS === 'web' ? AsyncStorage.removeItem(key) : SecureStore.deleteItemAsync(key),
};

type AuthContextType = {
    user: Session['user'] | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await SecureStore.getItemAsync('auth-token');
            if (token) {
                const { data: { user } } = await supabase.auth.getUser(token);
                setUser(user);
            }
            setIsLoading(false);
        };

        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session?.user) {
                    setUser(session.user);
                    await SecureStore.setItemAsync('auth-token', session.access_token);
                } else {
                    setUser(null);
                    await SecureStore.deleteItemAsync('auth-token');
                }
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;
        if (data.session) {
            setUser(data.user);
            await SecureStore.setItemAsync('auth-token', data.session.access_token);
        }
    };

    const register = async (email: string, password: string, name: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                }
            }
        });

        if (error) throw error;
        if (data.session) {
            setUser(data.user);
            await SecureStore.setItemAsync('auth-token', data.session.access_token);
        }
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        setUser(null);
        await SecureStore.deleteItemAsync('auth-token');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
