import { View, ScrollView, Text, Pressable, FlatList, StyleSheet, ImageBackground, Image } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '@/components/ThemeProvider';
import { useAuth } from '@/context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';


const recommendedItems = [
    { id: '1', title: 'Focus', subtitle: 'MEDITATION • 3-10 MIN', image: require('../../assets/rec-focus.png') },
    { id: '2', title: 'Happiness', subtitle: 'MEDITATION • 3-10 MIN', image: require('../../assets/rec-happiness.png') },
    { id: '3', title: 'Focus', subtitle: 'MEDITATION • 3-10 MIN', image: require('../../assets/rec-focus.png') },
];

export default function HomeScreen() {
    const { colors, isDark } = useTheme();
    const { user } = useAuth();

    const greeting = () => {
        const hour = dayjs().hour();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    const userName = user?.user_metadata?.name?.split(' ')[0] || 'Afsar';

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {/**/}
                    <View style={styles.header}>
                        <Image source={require('../../assets/logo.png')} style={styles.logo} />
                    </View>

                    {/**/}
                    <Text style={[styles.greetingTitle, { color: colors.text }]}>{greeting()}, {userName}</Text>
                    <Text style={styles.greetingSubtitle}>We Wish you have a good day</Text>

                    {/**/}
                    <View style={styles.mainCardsContainer}>
                        <Link href="/course/basics" asChild>
                            <Pressable>
                                <ImageBackground source={require('../../assets/basics-card.png')} style={styles.mainCard} imageStyle={{ borderRadius: 20 }}>
                                    <View style={styles.mainCardContent}>
                                        <Text style={styles.mainCardTitle}>Basics</Text>
                                        <Text style={styles.mainCardSubtitle}>COURSE</Text>
                                        <View style={styles.durationContainer}>
                                            <Text style={styles.durationText}>3-10 MIN</Text>
                                            <Pressable style={styles.startButton}>
                                                <Text style={styles.startButtonText}>START</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </ImageBackground>
                            </Pressable>
                        </Link>
                        <Link href="/course/relaxation" asChild>
                            <Pressable>
                                <ImageBackground source={require('../../assets/relaxation-card.png')} style={styles.mainCard} imageStyle={{ borderRadius: 20 }}>
                                    <View style={styles.mainCardContent}>
                                        <Text style={styles.mainCardTitle}>Relaxation</Text>
                                        <Text style={styles.mainCardSubtitle}>MUSIC</Text>
                                        <View style={styles.durationContainer}>
                                            <Text style={styles.durationText}>3-10 MIN</Text>
                                            <Pressable style={[styles.startButton, { backgroundColor: '#3F414E' }]}>
                                                <Text style={styles.startButtonText}>START</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </ImageBackground>
                            </Pressable>
                        </Link>
                    </View>

                    {/**/}
                    <Pressable>
                        <ImageBackground source={require('../../assets/daily-thought-bg.png')} style={styles.dailyThoughtCard} imageStyle={{ borderRadius: 20 }}>
                            <Text style={styles.dailyThoughtTitle}>Daily Thought</Text>
                            <Text style={styles.dailyThoughtSubtitle}>MEDITATION • 3-10 MIN</Text>
                            <Ionicons name="play-circle" size={40} color="white" style={styles.playIcon} />
                        </ImageBackground>
                    </Pressable>

                    {/**/}
                    <View>
                        <Text style={[styles.recommendedTitle, { color: colors.text }]}>Recommended for you</Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={recommendedItems}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <Link href={`/course/${item.id}`} asChild>
                                    <Pressable style={styles.recommendedItem}>
                                        <ImageBackground source={item.image} style={styles.recommendedImage} imageStyle={{ borderRadius: 15 }}>
                                            <View style={styles.recommendedOverlay} />
                                        </ImageBackground>
                                        <Text style={[styles.recommendedItemTitle, { color: colors.text }]}>{item.title}</Text>
                                        <Text style={styles.recommendedItemSubtitle}>{item.subtitle}</Text>
                                    </Pressable>
                                </Link>
                            )}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 150,
        height: 40,
        resizeMode: 'contain',
    },
    greetingTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    greetingSubtitle: {
        fontSize: 20,
        color: '#A1A4B2',
        marginBottom: 25,
    },
    mainCardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    mainCard: {
        width: 170,
        height: 210,
        justifyContent: 'flex-end',
    },
    mainCardContent: {
        padding: 20,
    },
    mainCardTitle: {
        color: '#3F414E',
        fontSize: 18,
        fontWeight: 'bold',
    },
    mainCardSubtitle: {
        color: '#5A6175',
        fontSize: 11,
        fontWeight: '500',
        marginBottom: 10,
    },
    durationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    durationText: {
        color: '#5A6175',
        fontSize: 12,
    },
    startButton: {
        backgroundColor: '#EBEAEC',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    startButtonText: {
        color: '#3F414E',
        fontSize: 12,
        fontWeight: 'bold',
    },
    dailyThoughtCard: {
        height: 95,
        borderRadius: 20,
        padding: 20,
        justifyContent: 'center',
        marginBottom: 20,
    },
    dailyThoughtTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    dailyThoughtSubtitle: {
        color: '#EBEAEC',
        fontSize: 11,
        fontWeight: '500',
        marginTop: 5,
    },
    playIcon: {
        position: 'absolute',
        right: 20,
    },
    recommendedTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    recommendedItem: {
        marginRight: 20,
    },
    recommendedImage: {
        width: 160,
        height: 115,
        borderRadius: 15,
        justifyContent: 'flex-end',
    },
    recommendedOverlay: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        flex: 1,
        borderRadius: 15,
    },
    recommendedItemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    recommendedItemSubtitle: {
        fontSize: 11,
        color: '#A1A4B2',
        marginTop: 5,
    },
});
