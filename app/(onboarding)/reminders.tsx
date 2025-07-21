import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/components/ThemeProvider';
import React, { useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedScrollHandler, useDerivedValue, runOnJS } from 'react-native-reanimated';


const daysOfWeek = [
    { key: 'SU', value: 'Sunday' }, { key: 'M', value: 'Monday' }, { key: 'T', value: 'Tuesday' },
    { key: 'W', value: 'Wednesday' }, { key: 'TH', value: 'Thursday' }, { key: 'F', value: 'Friday' },
    { key: 'S', value: 'Saturday' },
];
const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 3;

const TimePickerColumn = ({ data, onValueChange, initialValue }: any) => {
    const { colors } = useTheme(); 
    const scrollY = useSharedValue(0);
    const flatListRef = useRef<any>(null);
    const initialIndex = data.findIndex((item: any) => item === initialValue);

    const handleMomentumEnd = (index: number) => {
        onValueChange(data[index]);
    };

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => { scrollY.value = event.contentOffset.y; },
        onMomentumEnd: (event) => {
            const index = Math.round(event.contentOffset.y / ITEM_HEIGHT);
            runOnJS(handleMomentumEnd)(index);
        },
    });

    return (
        <Animated.FlatList
            ref={flatListRef}
            data={['', ...data, '']}
            renderItem={({ item, index }) => {
                const derivedIndex = useDerivedValue(() => Math.round(scrollY.value / ITEM_HEIGHT));
                const isSelected = useDerivedValue(() => derivedIndex.value === index - 1);
                const isActive = index > 0 && index <= data.length;
                return (
                    <View style={styles.itemWrapper}>
                        {isActive && (
                            <Text style={[styles.itemText, { color: isSelected.value ? colors.text : '#A1A4B2' }]}>
                                {typeof item === 'number' ? String(item).padStart(2, '0') : item}
                            </Text>
                        )}
                    </View>
                );
            }}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            getItemLayout={(_, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index, })}
            initialScrollIndex={initialIndex}
        />
    );
};


export default function RemindersScreen() {
    const { colors, isDark } = useTheme();
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [hour, setHour] = useState(11);
    const [minute, setMinute] = useState(30);
    const [period, setPeriod] = useState<'AM' | 'PM'>('AM');

    const handleSave = async () => {
        const reminder = {
            time: `${hour}:${String(minute).padStart(2, '0')} ${period}`,
            days: selectedDays,
        };
        try {
            await AsyncStorage.setItem('reminders', JSON.stringify(reminder));
            router.replace('/(tabs)/home');
        } catch (error) {
            console.error('Failed to save reminder:', error);
        }
    };

    const handleNoThanks = () => {
        router.replace('/(tabs)/home');
    };

    const hoursData = Array.from({ length: 12 }, (_, i) => i + 1);
    const minutesData = Array.from({ length: 60 }, (_, i) => i);
    const periodData = ['AM', 'PM'];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.content}>
                <View style={styles.section}>
                    <Text style={[styles.title, { color: colors.text }]}>What time would you like to meditate?</Text>
                    <Text style={[styles.subtitle, { color: isDark ? '#EBEAEC' : '#A1A4B2' }]}>Any time you can choose but we recommend first thing in the morning.</Text>
                    <View style={styles.pickerContainer}>
                        <View style={styles.pickerIndicator} />
                        <TimePickerColumn data={hoursData} onValueChange={setHour} initialValue={hour} />
                        <Text style={[styles.pickerSeparator, { color: colors.text }]}>:</Text>
                        <TimePickerColumn data={minutesData} onValueChange={setMinute} initialValue={minute} />
                        <TimePickerColumn data={periodData} onValueChange={setPeriod} initialValue={period} />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.title, { color: colors.text }]}>Which day would you like to meditate?</Text>
                    <Text style={[styles.subtitle, { color: isDark ? '#EBEAEC' : '#A1A4B2' }]}>Everyday is best, but we recommend picking at least five.</Text>
                    <View style={styles.daysContainer}>
                        {daysOfWeek.map(day => {
                            const isSelected = selectedDays.includes(day.key);
                            return (
                                <Pressable key={day.key} onPress={() => setSelectedDays(prev => prev.includes(day.key) ? prev.filter(d => d !== day.key) : [...prev, day.key])}>
                                    <View style={[styles.dayCircle, { backgroundColor: isSelected ? '#3F414E' : colors.card, borderColor: isSelected ? '#3F414E' : '#A1A4B2' }]}>
                                        <Text style={{ color: isSelected ? 'white' : '#A1A4B2', fontWeight: '600' }}>{day.key}</Text>
                                    </View>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>
            </View>

            <View style={styles.footer}>
                <Pressable onPress={handleSave} style={[styles.button, { backgroundColor: colors.primary }]}>
                    <Text style={styles.buttonText}>SAVE</Text>
                </Pressable>
                <Pressable onPress={handleNoThanks}>
                    <Text style={[styles.noThanksText, { color: colors.text }]}>NO THANKS</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { 
        flex: 1, 
        paddingHorizontal: 20, 
        justifyContent: 'center' 
    },
    section: { 
        marginBottom: 40, 
        alignItems: 'center' 
    },
    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        textAlign: 'center',
         marginBottom: 5 },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 24,
        color: '#A1A4B2',
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: ITEM_HEIGHT * VISIBLE_ITEMS,
        marginTop: 20,
    },
    pickerIndicator: {
        position: 'absolute',
        top: ITEM_HEIGHT,
        left: -20,
        right: -20,
        height: ITEM_HEIGHT,
        backgroundColor: 'rgba(161, 164, 178, 0.1)',
        borderRadius: 10,
    },
    itemWrapper: { 
        height: ITEM_HEIGHT, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    itemText: { 
        fontSize: 24, 
        fontWeight: 'bold' 
    },
    pickerSeparator: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginHorizontal: 10 
    },
    daysContainer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: '100%', 
        marginTop: 30 
    },
    dayCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    footer: { 
        paddingHorizontal: 20,
        paddingBottom: 20 
        },
    button: { 
        paddingVertical: 18, 
        borderRadius: 30, 
        alignItems: 'center', 
        marginBottom: 20 
    },
    buttonText: { 
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: 14 
    },
    noThanksText: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 14,
        textTransform: 'uppercase', },
});
