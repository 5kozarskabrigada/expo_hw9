import { View, Text, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '../ThemeProvider';

const recommendedItems = [
    {
        id: '1',
        title: 'Focus Attention',
        duration: '10 min',
        category: 'Focus',
        emoji: '🧠'
    },
    {
        id: '2',
        title: 'Body Scan',
        duration: '5 min',
        category: 'Happiness',
        emoji: '😊'
    },
    {
        id: '3',
        title: 'Mindfulness',
        duration: '15 min',
        category: 'Focus',
        emoji: '🌿'
    },
    {
        id: '4',
        title: 'Anxiety Relief',
        duration: '20 min',
        category: 'Anxiety',
        emoji: '🧘‍♂️'
    },
];

export default function RecommendedList() {
    const { colors } = useTheme();

    return (
        <View>
            <Text style={{
                fontSize: 18,
                fontWeight: '600',
                color: colors.text,
                marginBottom: 15,
            }}>
                Recommended for You
            </Text>

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={recommendedItems}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <Link href={`/course/${item.id}`} asChild>
                        <View style={{
                            width: 160,
                            backgroundColor: colors.card,
                            borderRadius: 15,
                            padding: 15,
                            marginRight: 15,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 3,
                        }}>
                            <View style={{
                                width: 48,
                                height: 48,
                                borderRadius: 24,
                                backgroundColor: colors.primary + '20', // 20% opacity
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 12,
                            }}>
                                <Text style={{ fontSize: 24 }}>{item.emoji}</Text>
                            </View>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600',
                                color: colors.text,
                                marginBottom: 4,
                            }}>
                                {item.title}
                            </Text>
                            <Text style={{
                                fontSize: 12,
                                color: colors.text,
                                opacity: 0.7
                            }}>
                                {item.duration} • {item.category}
                            </Text>
                        </View>
                    </Link>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
}