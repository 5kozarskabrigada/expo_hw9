import { View, Text, ScrollView, Pressable } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../components/ThemeProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useState } from 'react';

export default function ProfileScreen() {
    const { user, logout } = useAuth();
    const { colors } = useTheme();
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [reminders, setReminders] = useState<any>(null);

    useFocusEffect(() => {
        const loadData = async () => {
            const topics = await AsyncStorage.getItem('user-topics');
            if (topics) setSelectedTopics(JSON.parse(topics));

            const reminderData = await AsyncStorage.getItem('reminders');
            if (reminderData) setReminders(JSON.parse(reminderData));
        };

        loadData();
    });

    const handleLogout = async () => {
        await logout();
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.text, marginBottom: 30 }}>
                    Profile
                </Text>

                <View style={{
                    backgroundColor: colors.card,
                    borderRadius: 20,
                    padding: 20,
                    marginBottom: 20,
                }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 10 }}>
                        {user?.user_metadata?.name || 'User'}
                    </Text>
                    <Text style={{ color: colors.text, opacity: 0.7 }}>
                        {user?.email}
                    </Text>
                </View>

                {selectedTopics.length > 0 && (
                    <View style={{
                        backgroundColor: colors.card,
                        borderRadius: 20,
                        padding: 20,
                        marginBottom: 20,
                    }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 10 }}>
                            Your Meditation Goals
                        </Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {selectedTopics.map((topicId, index) => (
                                <View
                                    key={index}
                                    style={{
                                        backgroundColor: colors.primary,
                                        paddingHorizontal: 12,
                                        paddingVertical: 6,
                                        borderRadius: 15,
                                        marginRight: 8,
                                        marginBottom: 8,
                                    }}
                                >
                                    <Text style={{ color: 'white', fontSize: 14 }}>
                                        {topicId.replace('-', ' ')}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {reminders && (
                    <View style={{
                        backgroundColor: colors.card,
                        borderRadius: 20,
                        padding: 20,
                        marginBottom: 20,
                    }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 10 }}>
                            Reminders
                        </Text>
                        <Text style={{ color: colors.text, marginBottom: 5 }}>
                            Time: {reminders.time}
                        </Text>
                        <Text style={{ color: colors.text }}>
                            Days: {reminders.days.join(', ')}
                        </Text>
                    </View>
                )}

                <Pressable
                    onPress={handleLogout}
                    style={{
                        backgroundColor: colors.notification,
                        padding: 15,
                        borderRadius: 30,
                        alignItems: 'center',
                        marginTop: 20,
                    }}
                >
                    <Text style={{ color: 'white', fontWeight: '600' }}>
                        Logout
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}