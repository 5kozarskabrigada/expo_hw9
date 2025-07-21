import { View, Text, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '@/components/ThemeProvider';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { meditations } from '../../constants/data'; 


const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export default function PlayerScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { colors, isDark } = useTheme();


    const track = meditations.find(item => item.id === id);


    const [isPlaying, setIsPlaying] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const [currentTime, setCurrentTime] = useState(90); 
    const [duration] = useState(2700); 


    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentTime(prevTime => {
                    if (prevTime < duration) return prevTime + 1;
                    setIsPlaying(false);
                    return prevTime;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, duration]);


    const handleSkip = (amount: number) => {
        setCurrentTime(prevTime => {
            const newTime = prevTime + amount;
            if (newTime < 0) return 0;
            if (newTime > duration) return duration;
            return newTime;
        });
    };

    if (!track) {
        return <View><Text>Track not found!</Text></View>;
    }

    const playerBackgroundColor = isDark ? '#1C1C1E' : '#F5F5F5';
    const iconButtonBackgroundColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
    const textColor = isDark ? '#FFFFFF' : '#3F414E';

    return (
        <ImageBackground
            source={track.bgImage}
            style={[styles.container, { backgroundColor: playerBackgroundColor }]}
        >
            <SafeAreaView style={{ flex: 1 }}>
                {/*  */}
                <View style={styles.header}>
                    <Pressable onPress={() => router.back()} style={[styles.iconButton, { backgroundColor: iconButtonBackgroundColor }]}>
                        <Ionicons name="close" size={28} color={textColor} />
                    </Pressable>
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable onPress={() => setIsFavorite(!isFavorite)} style={[styles.iconButton, { backgroundColor: iconButtonBackgroundColor }]}>
                            <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? '#E57373' : textColor} />
                        </Pressable>
                        <Pressable style={[styles.iconButton, { backgroundColor: iconButtonBackgroundColor, marginLeft: 15 }]}>
                            <Ionicons name="download-outline" size={24} color={textColor} />
                        </Pressable>
                    </View>
                </View>

                {/* */}
                <View style={styles.mainContent}>
                    <Text style={[styles.title, { color: textColor }]}>{track.title}</Text>
                    <Text style={styles.subtitle}>{track.title}</Text>
                </View>

                {/* */}
                <View style={styles.controlsContainer}>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={duration}
                        value={currentTime}
                        onValueChange={setCurrentTime}
                        minimumTrackTintColor={textColor}
                        maximumTrackTintColor={isDark ? '#5A6175' : '#D8D8D8'}
                        thumbTintColor={textColor}
                    />
                    <View style={styles.timeContainer}>
                        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                        <Text style={styles.timeText}>{formatTime(duration)}</Text>
                    </View>
                    <View style={styles.playerButtons}>
                        <Pressable onPress={() => handleSkip(-15)}>
                            <Ionicons name="play-back-circle-outline" size={45} color={textColor} />
                        </Pressable>
                        <Pressable onPress={() => setIsPlaying(!isPlaying)} style={[styles.playPauseButton, { backgroundColor: textColor }]}>
                            <Ionicons name={isPlaying ? "pause" : "play"} size={45} color={playerBackgroundColor} />
                        </Pressable>
                        <Pressable onPress={() => handleSkip(15)}>
                            <Ionicons name="play-forward-circle-outline" size={45} color={textColor} />
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    iconButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#A1A4B2',
        marginTop: 15,
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    controlsContainer: {
        paddingHorizontal: 30,
        paddingBottom: 40,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -10,
    },
    timeText: {
        color: '#A1A4B2',
        fontSize: 14,
    },
    playerButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        gap: 30,
    },
    playPauseButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});