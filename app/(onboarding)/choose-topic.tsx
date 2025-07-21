import { View, Text, FlatList, Pressable, ImageBackground, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '../../components/ThemeProvider';
import { topics } from '../../constants/topics';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChooseTopic() {
    const { colors } = useTheme();
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

    const toggleTopic = (id: string) => {
        setSelectedTopics(prev =>
            prev.includes(id)
                ? prev.filter(topicId => topicId !== id)
                : [...prev, id]
        );
    };

    const handleContinue = async () => {
        if (selectedTopics.length === 0) return;
        try {

            await AsyncStorage.setItem('user-topics', JSON.stringify(selectedTopics));
            router.push('/(onboarding)/reminders');
        } catch (error) {
            console.error('Failed to save topics to storage', error);
            alert('Could not save your preferences. Please try again.');
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]}>What Brings You</Text>
                <Text style={[styles.title, { color: colors.text, marginBottom: 10 }]}>to Silent Moon?</Text>
                <Text style={[styles.subtitle, { color: colors.text, opacity: 0.7 }]}>
                    choose a topic to focus on:
                </Text>
            </View>

            <FlatList
                data={topics}
                numColumns={2}
                columnWrapperStyle={styles.listWrapper}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    const isSelected = selectedTopics.includes(item.id);
                    return (
                        <Pressable
                            onPress={() => toggleTopic(item.id)}
                            style={styles.topicItem}
                        >
                            <ImageBackground
                                source={item.image}
                                resizeMode="cover"
                                style={styles.imageBackground}
                                imageStyle={{ borderRadius: 10 }}
                            >
                                <View style={[
                                    styles.overlay,

                                    { backgroundColor: isSelected ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.3)' }
                                ]}>
                                    <Text style={styles.topicTitle}>{item.title}</Text>
                                </View>
                            </ImageBackground>
                        </Pressable>
                    );
                }}
                keyExtractor={item => item.id}
            />

            <View style={styles.footer}>
                <Pressable
                    onPress={handleContinue}
                    disabled={selectedTopics.length === 0}
                    style={[
                        styles.button,
                        { backgroundColor: selectedTopics.length > 0 ? colors.primary : colors.border }
                    ]}
                >
                    <Text style={[
                        styles.buttonText,
                        { color: selectedTopics.length > 0 ? 'white' : colors.text }
                    ]}>
                        Continue
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Helvetica Neue', 
    },
    subtitle: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 15,
    },
    listContainer: {
        paddingHorizontal: 15,
    },
    listWrapper: {
        justifyContent: 'space-between',
    },
    topicItem: {
        width: '48%',
        aspectRatio: 1,
        marginBottom: 15,
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        borderRadius: 10,
        padding: 15,
    },
    topicTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Helvetica Neue',
    },
    footer: {
        padding: 20,
    },
    button: {
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});