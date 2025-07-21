import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useTheme } from '../../components/ThemeProvider';


const courseData = {
    'basics': {
        title: 'Basics of Meditation',
        description: 'Learn the fundamental techniques of meditation to establish a strong foundation for your practice.',
        stats: { favorites: 1243, listening: 5678 },
        tracks: [
            { id: '1', title: 'Introduction', duration: '5 min' },
            { id: '2', title: 'Breathing Techniques', duration: '8 min' },
            { id: '3', title: 'Body Scan', duration: '10 min' },
        ]
    },
    'relaxation': {
        title: 'Relaxation Music',
        description: 'Soothing sounds to help you relax and unwind after a long day.',
        stats: { favorites: 987, listening: 4321 },
        tracks: [
            { id: '1', title: 'Ocean Waves', duration: '15 min' },
            { id: '2', title: 'Forest Ambience', duration: '15 min' },
        ]
    }
};

export default function CourseDetails() {
    const { id } = useLocalSearchParams();
    const { colors } = useTheme();
    const [voice, setVoice] = useState<'male' | 'female'>('female');
    const course = courseData[id as keyof typeof courseData];

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
            <Image
                source={require('../../assets/course-banner.png')}
                style={{ width: '100%', height: 200, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
            />

            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.text, marginBottom: 5 }}>
                    {course.title}
                </Text>
                <Text style={{ fontSize: 16, color: colors.text, opacity: 0.7, marginBottom: 20 }}>
                    {course.description}
                </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: colors.text, marginRight: 5 }}>❤️</Text>
                        <Text style={{ color: colors.text }}>{course.stats.favorites.toLocaleString()}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: colors.text, marginRight: 5 }}>▶️</Text>
                        <Text style={{ color: colors.text }}>{course.stats.listening.toLocaleString()}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
                    <Pressable
                        onPress={() => setVoice('male')}
                        style={{
                            flex: 1,
                            padding: 15,
                            borderRadius: 10,
                            backgroundColor: voice === 'male' ? colors.primary : colors.card,
                            marginRight: 10,
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{ color: voice === 'male' ? 'white' : colors.text }}>Male Voice</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => setVoice('female')}
                        style={{
                            flex: 1,
                            padding: 15,
                            borderRadius: 10,
                            backgroundColor: voice === 'female' ? colors.primary : colors.card,
                            marginLeft: 10,
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{ color: voice === 'female' ? 'white' : colors.text }}>Female Voice</Text>
                    </Pressable>
                </View>

                <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 15 }}>
                    Tracks
                </Text>

                {course.tracks.map((track, index) => (
                    <Pressable
                        key={track.id}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 15,
                            backgroundColor: colors.card,
                            borderRadius: 10,
                            marginBottom: 10
                        }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: colors.text, marginRight: 15 }}>{index + 1}</Text>
                            <Text style={{ color: colors.text }}>{track.title}</Text>
                        </View>
                        <Text style={{ color: colors.text, opacity: 0.7 }}>{track.duration}</Text>
                    </Pressable>
                ))}

                <Pressable
                    style={{
                        backgroundColor: colors.primary,
                        padding: 15,
                        borderRadius: 30,
                        alignItems: 'center',
                        marginTop: 30
                    }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Start Listening</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}