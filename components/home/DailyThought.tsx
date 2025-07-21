import { View, Text, Pressable } from 'react-native';
import { useTheme } from '../ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

export default function DailyThought() {
    const { colors } = useTheme();

    return (
        <View style={{
            backgroundColor: colors.primary,
            borderRadius: 20,
            padding: 20,
            marginBottom: 20,
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 5,
        }}>
            <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'white',
                marginBottom: 10,
            }}>
                Daily Thought
            </Text>

            <Text style={{
                fontSize: 14,
                color: 'white',
                opacity: 0.9,
                marginBottom: 15,
            }}>
                Meditation • 3-10 min
            </Text>

            <Pressable
                style={({ pressed }) => ({
                    backgroundColor: 'white',
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                    borderRadius: 30,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: pressed ? 0.8 : 1,
                    alignSelf: 'flex-start',
                })}
            >
                <Ionicons
                    name="play"
                    size={16}
                    color={colors.primary}
                    style={{ marginRight: 8 }}
                />
                <Text style={{
                    color: colors.primary,
                    fontWeight: '600',
                    fontSize: 14,
                }}>
                    Play Now
                </Text>
            </Pressable>
        </View>
    );
}