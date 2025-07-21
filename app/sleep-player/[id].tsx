import { View, Text, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { sleepStories } from '../../constants/data'; 

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};


const SkipButton = ({ iconName, onPress }: { iconName: 'refresh' | 'play-back' | 'play-forward', onPress: () => void }) => (
    <Pressable onPress={onPress} style={styles.skipButtonContainer}>
        <Ionicons name={iconName} size={24} color="#EBEAEC" />
        <Text style={styles.skipButtonText}>15</Text>
    </Pressable>
);

export default function SleepPlayerScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    
    const track = sleepStories.find(item => item.id === id);

    const [isPlaying, setIsPlaying] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const [currentTime, setCurrentTime] = useState(90); 
    const [duration] = useState(2700);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => setCurrentTime(t => (t < duration ? t + 1 : t)), 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, duration]);

    const handleSkip = (amount: number) => {
        setCurrentTime(t => Math.max(0, Math.min(duration, t + amount)));
    };
    
    if (!track) return <View><Text>Track not found!</Text></View>;

    return (
        <ImageBackground source={track.playerImage} style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Pressable onPress={() => router.back()} style={styles.headerButton}>
                        <Ionicons name="close" size={28} color="white" />
                    </Pressable>
                    <View style={{ flexDirection: 'row', gap: 15 }}>
                        <Pressable onPress={() => setIsFavorite(!isFavorite)} style={styles.headerButton}>
                            <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color="white" />
                        </Pressable>
                        <Pressable style={styles.headerButton}>
                            <Ionicons name="download-outline" size={24} color="white" />
                        </Pressable>
                    </View>
                </View>

                <View style={styles.mainContent}>
                    <Text style={styles.title}>{track.title}</Text>
                    <Text style={styles.subtitle}>{track.subtitle}</Text>
                </View>

                <View style={styles.controlsContainer}>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={duration}
                        value={currentTime}
                        onValueChange={setCurrentTime}
                        minimumTrackTintColor="#8E97FD"
                        maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
                        thumbTintColor="#8E97FD"
                    />
                    <View style={styles.timeContainer}>
                        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                        <Text style={styles.timeText}>{formatTime(duration)}</Text>
                    </View>
                    <View style={styles.playerButtons}>
                        <SkipButton iconName="refresh" onPress={() => handleSkip(-15)} />
                        <Pressable onPress={() => setIsPlaying(!isPlaying)} style={styles.playPauseButton}>
                            <Ionicons name={isPlaying ? "pause" : "play"} size={40} color="#03174C" />
                        </Pressable>
                        <SkipButton iconName="refresh" onPress={() => handleSkip(15)}/>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#03174C' 
    },
    header: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingHorizontal: 20, 
        paddingTop: 10 
    },
    headerButton: { 
        width: 50, 
        height: 50, 
        borderRadius: 25, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(255, 255, 255, 0.1)' 
    },
    mainContent: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingHorizontal: 20 
    },
    title: { 
        color: 'white', 
        fontSize: 32, 
        fontWeight: 'bold', 
        textAlign: 'center' 
    },
    subtitle: { 
        color: '#EBEAEC', 
        fontSize: 14, 
        marginTop: 15, 
        fontWeight: '500', 
        textTransform: 'uppercase', 
        letterSpacing: 1 
    },
    controlsContainer: { 
        paddingHorizontal: 30, 
        paddingBottom: 40 
    },
    slider: { 
        width: '100%', 
        height: 40 
    },
    timeContainer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: -10 
    },
    timeText: { 
        color: '#EBEAEC', 
        fontSize: 14 
    },
    playerButtons: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 20, gap: 30 
    },
    playPauseButton: { 
        width: 80, 
        height: 80, 
        borderRadius: 40, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#EBEAEC' 
    },
    skipButtonContainer: { 
        justifyContent: 'center', 
        alignItems: 'center' }
        ,
    skipButtonText: { 
        position: 'absolute', 
        color: '#EBEAEC', 
        fontSize: 12, 
        fontWeight: 'bold' },
});