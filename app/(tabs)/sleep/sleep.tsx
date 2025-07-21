import { View, Text, FlatList, Pressable, ImageBackground, StyleSheet, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '@/components/ThemeProvider';
import React, { useState } from 'react';
import { sleepStories, sleepCategories } from '../../../constants/data'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function SleepStoriesScreen() {
    const { colors } = useTheme();
    const { width } = useWindowDimensions();
    const [selectedCategory, setSelectedCategory] = useState('all');


    const featuredStory = sleepStories.find(s => s.isFeatured);
    const filteredGridItems = sleepStories.filter(s =>
        !s.isFeatured && (selectedCategory === 'all' || s.category.toLowerCase() === selectedCategory)
    );

    const cardWidth = (width - 50) / 2; 

    return (
        <ImageBackground
            source={require('../../../assets/sleep-welcome-bg.png')}
            style={styles.container}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    data={filteredGridItems}
                    numColumns={2}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={styles.gridWrapper}
                    contentContainerStyle={styles.listContainer}
                    ListHeaderComponent={() => (
                        <>
                            {/**/}
                            <Text style={styles.headerTitle}>Sleep Stories</Text>
                            <Text style={styles.headerSubtitle}>
                                Soothing bedtime stories to help you fall into a deep and natural sleep
                            </Text>

                            {/**/}
                            <View style={styles.categoryContainer}>
                                {sleepCategories.map((item) => (
                                    <Pressable
                                        key={item.id}
                                        onPress={() => setSelectedCategory(item.id)}
                                        style={styles.categoryItem}
                                    >
                                        <View style={[styles.categoryIconContainer, { backgroundColor: selectedCategory === item.id ? colors.primary : '#5A6175' }]}>
                                            <Ionicons name={item.icon} size={24} color={'white'} />
                                        </View>
                                        <Text style={styles.categoryText}>{item.name}</Text>
                                    </Pressable>
                                ))}
                            </View>

                            {/**/}
                            {featuredStory && (
                                <Link href={`/sleep/${featuredStory.id}`} asChild>
                                    <Pressable>
                                        <ImageBackground
                                            source={featuredStory.image}
                                            style={styles.featuredCard}
                                            imageStyle={{ borderRadius: 10 }}
                                        >
                                            <Ionicons name="lock-closed" size={20} color="white" style={styles.lockIcon} />
                                            <Text style={styles.featuredTitle}>{featuredStory.title}</Text>
                                            <Text style={styles.featuredSubtitle}>{featuredStory.subtitle}</Text>
                                            <View style={styles.startButton}>
                                                <Text style={styles.startButtonText}>START</Text>
                                            </View>
                                        </ImageBackground>
                                    </Pressable>
                                </Link>
                            )}
                        </>
                    )}
                    renderItem={({ item }) => (
                        <Link href={`/sleep/${item.id}`} asChild>
                            <Pressable style={{ width: cardWidth }}>
                                <ImageBackground
                                    source={item.image}
                                    style={styles.storyCard}
                                    imageStyle={{ borderRadius: 10 }}
                                />
                                <Text style={styles.storyTitle}>{item.title}</Text>
                                <Text style={styles.storySubtitle}>{item.subtitle}</Text>
                            </Pressable>
                        </Link>
                    )}
                />
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    headerTitle: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    headerSubtitle: {
        color: '#EBEAEC',
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 20,
        marginTop: 15,
        marginBottom: 20,
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        marginBottom: 10,
    },
    categoryItem: {
        alignItems: 'center',
    },
    categoryIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryText: {
        marginTop: 10,
        color: '#EBEAEC',
        fontSize: 14,
    },
    featuredCard: {
        height: 200,
        justifyContent: 'center',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    lockIcon: {
        position: 'absolute',
        top: 15,
        left: 15,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 5,
        borderRadius: 10,
    },
    featuredTitle: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
    },
    featuredSubtitle: {
        color: '#EBEAEC',
        fontSize: 14,
        marginTop: 5,
        lineHeight: 20,
    },
    startButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    startButtonText: {
        color: '#3F414E',
        fontSize: 12,
        fontWeight: 'bold',
    },
    gridWrapper: {
        justifyContent: 'space-between',
    },
    storyCard: {
        height: 170,
        borderRadius: 10,
    },
    storyTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    storySubtitle: {
        color: '#EBEAEC',
        fontSize: 12,
        marginTop: 5,
    },
});
