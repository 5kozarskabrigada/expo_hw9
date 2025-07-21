import { View, Text, StyleSheet, Pressable, ImageBackground, ScrollView, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '../../../components/ThemeProvider'; 
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { sleepStories } from '../../../constants/data'; 

export default function SleepStoryDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { colors } = useTheme();


    const story = sleepStories.find(s => s.id === id);


    const relatedStories = story?.related.map(relatedId =>
        sleepStories.find(s => s.id === relatedId)
    ).filter(Boolean); 

    if (!story) {
        return <View><Text>Sleep story not found!</Text></View>;
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground source={story.headerImage} style={styles.headerImage}>
                    <SafeAreaView style={styles.header}>
                        <Pressable onPress={() => router.back()} style={styles.iconButton}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </Pressable>
                        <View style={styles.headerIcons}>
                            <Pressable style={[styles.iconButton, { backgroundColor: '#586175' }]}>
                                <Ionicons name="heart-outline" size={24} color="white" />
                            </Pressable>
                            <Pressable style={[styles.iconButton, { backgroundColor: '#586175' }]}>
                                <Ionicons name="download-outline" size={24} color="white" />
                            </Pressable>
                        </View>
                    </SafeAreaView>
                </ImageBackground>

                <View style={styles.content}>
                    <Text style={styles.title}>{story.title}</Text>
                    <Text style={styles.subtitle}>{story.subtitle}</Text>
                    <Text style={styles.description}>{story.description}</Text>

                    {/* Stats */}
                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Ionicons name="heart" size={20} color="#EBEAEC" />
                            <Text style={styles.statText}>{story.stats.favorites.toLocaleString()} Favorites</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Ionicons name="headset" size={20} color="#EBEAEC" />
                            <Text style={styles.statText}>{story.stats.listening.toLocaleString()} Listening</Text>
                        </View>
                    </View>

                    {/* Related */}
                    <Text style={styles.relatedTitle}>Related</Text>
                    <FlatList
                        horizontal
                        data={relatedStories}
                        keyExtractor={(item) => item!.id}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => router.push(`/sleep/${item!.id}`)} style={styles.relatedItem}>
                                <ImageBackground source={item!.image} style={styles.relatedImage} imageStyle={{ borderRadius: 10 }} />
                                <Text style={styles.relatedItemTitle}>{item!.title}</Text>
                                <Text style={styles.relatedItemSubtitle}>{item!.subtitle}</Text>
                            </Pressable>
                        )}
                    />
                </View>
            </ScrollView>
            <View style={[styles.footer, { borderTopColor: colors.border }]}>
                <Pressable
                    onPress={() => router.push(`../../sleep-player/${story.id}`)}
                    style={[styles.playButton, { backgroundColor: colors.primary }]}
                >
                    <Text style={styles.playButtonText}>PLAY</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#03174C' 
    },
    headerImage: { 
        height: 350, 
        justifyContent: 'space-between' 
    },
    header: { 
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        padding: 20 
    },
    iconButton: { 
        width: 40, 
        height: 40, 
        borderRadius: 20, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    headerIcons: { 
        flexDirection: 'row', 
        gap: 10 }
        ,
    content: { 
        padding: 20 
    },
    title: { 
        color: 'white', 
        fontSize: 32, 
        fontWeight: 'bold' 
    },
    subtitle: { 
        color: '#EBEAEC', 
        fontSize: 14, 
        textTransform: 'uppercase', 
        marginTop: 10 
    },
    description: { 
        color: '#EBEAEC', 
        fontSize: 16, 
        marginTop: 20, 
        lineHeight: 24 
    },
    statsContainer: { 
        flexDirection: 'row', 
        gap: 20, 
        marginTop: 20 
    },
    statItem: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 8 
    },
    statText: { 
        color: '#EBEAEC', 
        fontSize: 14 
    },
    relatedTitle: { 
        color: 'white', 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginTop: 30, 
        marginBottom: 15 
    },
    relatedItem: { 
        marginRight: 20, 
        width: 170 
    },
    relatedImage: { 
        height: 115, 
        borderRadius: 10 
    },
    relatedItemTitle: { 
        color: 'white', 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginTop: 10 
    },
    relatedItemSubtitle: { 
        color: '#98A1BD', 
        fontSize: 12, 
        marginTop: 5 
    },
    footer: { 
        padding: 20, 
        backgroundColor: '#03174C', 
        borderTopWidth: 1 
    },
    playButton: { 
        paddingVertical: 18, 
        borderRadius: 30, 
        alignItems: 'center' 
    },
    playButtonText: { 
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: 16 
    },
});