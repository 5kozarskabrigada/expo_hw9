import { View, Text, FlatList, Pressable, StyleSheet, ImageBackground } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '../../components/ThemeProvider';
import { musicTracks } from '../../constants/data';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function MusicScreen() {
    const { colors } = useTheme();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Music</Text>
            </View>
            <FlatList
                data={musicTracks}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <Link href={`/player/${item.id}`} asChild>
                        <Pressable>
                            <ImageBackground
                                source={item.image}
                                style={styles.trackCard}
                                imageStyle={{ borderRadius: 15 }}
                            >
                                <View style={styles.cardOverlay}>
                                    <View>
                                        <Text style={styles.trackTitle}>{item.title}</Text>
                                        <Text style={styles.trackSubtitle}>
                                            {item.artist} • {item.duration}
                                        </Text>
                                    </View>
                                    <View style={styles.playButton}>
                                        <Ionicons name="play" size={20} color={colors.text} />
                                    </View>
                                </View>
                            </ImageBackground>
                        </Pressable>
                    </Link>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    trackCard: {
        height: 100,
        justifyContent: 'flex-end',
        borderRadius: 15,
        marginBottom: 15,
    },
    cardOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)',
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    trackTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    trackSubtitle: {
        color: '#EBEAEC',
        fontSize: 14,
        marginTop: 5,
    },
    playButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});