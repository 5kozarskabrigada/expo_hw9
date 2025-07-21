import { View, Text, FlatList, Pressable, ImageBackground, StyleSheet, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '@/components/ThemeProvider';
import React, { useState } from 'react';
import { meditations, categories } from '../../constants/data'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function MeditateScreen() {
    const { colors } = useTheme();
    const { width } = useWindowDimensions();
    const [selectedCategory, setSelectedCategory] = useState('all');

    const dailyCalmItem = meditations.find(m => m.id === '1');

    const gridItems = meditations.filter(m => {
        if (m.id === '1') return false;
        if (selectedCategory === 'all') return true;
        return m.category.toLowerCase() === selectedCategory.toLowerCase();
    });

    const cardWidth = (width - 50) / 2;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <FlatList
                data={gridItems}
                numColumns={2}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.gridWrapper}
                contentContainerStyle={styles.listContainer}
                ListHeaderComponent={() => (
                    <>
                        <Text style={[styles.headerTitle, { color: colors.text }]}>Meditate</Text>
                        <Text style={styles.headerSubtitle}>
                            we can learn how to recognize when our minds are doing their normal everyday acrobatics.
                        </Text>
                        <View style={styles.categoryContainer}>
                            {categories.map((item) => (
                                <Pressable
                                    key={item.id}
                                    onPress={() => setSelectedCategory(item.id)}
                                    style={styles.categoryItem}
                                >
                                    <View style={[
                                        styles.categoryIconContainer,
                                        { backgroundColor: selectedCategory === item.id ? colors.primary : '#A0A3B1' }
                                    ]}>
                                        <Ionicons name={item.icon} size={24} color={'white'} />
                                    </View>
                                    <Text style={styles.categoryText}>{item.name}</Text>
                                </Pressable>
                            ))}
                        </View>
                        {dailyCalmItem && (

                            <Link href={`/player/${dailyCalmItem.id}`} asChild>
                                <Pressable>
                                    <ImageBackground
                                        source={dailyCalmItem.image}
                                        style={styles.dailyCalmCard}
                                        imageStyle={{ borderRadius: 10 }}
                                    >
                                        <Text style={styles.dailyCalmTitle}>{dailyCalmItem.title}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={styles.dailyCalmSubtitle}>{dailyCalmItem.duration.toUpperCase()}</Text>
                                            <Ionicons name='ellipse' size={4} color='#5A6175' style={{ marginHorizontal: 5 }} />
                                            <Text style={styles.dailyCalmSubtitle}>PAUSE PRACTICE</Text>
                                        </View>
                                        <View style={styles.playButton}>
                                            <Ionicons name="play" size={20} color="#3F414E" />
                                        </View>
                                    </ImageBackground>
                                </Pressable>
                            </Link>
                        )}
                    </>
                )}
                renderItem={({ item }) => (

                    <Link href={`/player/${item.id}`} asChild>
                        <Pressable style={{ width: cardWidth }}>
                            <ImageBackground
                                source={item.image}
                                style={styles.meditationCard}
                                imageStyle={{ borderRadius: 10 }}
                            >
                                <View style={styles.cardOverlay}>
                                    <Text style={styles.cardTitle}>{item.title}</Text>
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
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    headerSubtitle: {
        color: '#A1A4B2',
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
        color: '#A1A4B2',
        fontSize: 14,
    },
    dailyCalmCard: {
        height: 95,
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    dailyCalmTitle: {
        color: '#3F414E',
        fontSize: 20,
        fontWeight: 'bold',
    },
    dailyCalmSubtitle: {
        color: '#5A6175',
        fontSize: 12,
        fontWeight: '500',
        marginTop: 5,
    },
    playButton: {
        position: 'absolute',
        right: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#3F414E',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridWrapper: {
        justifyContent: 'space-between',
    },
    meditationCard: {
        height: 160,
        borderRadius: 10,
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    cardOverlay: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 10,
    },
    cardTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});