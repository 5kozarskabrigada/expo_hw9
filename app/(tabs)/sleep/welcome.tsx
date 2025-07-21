import { View, Text, StyleSheet, Pressable, ImageBackground, Image } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '../../../components/ThemeProvider'; 
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeToSleepScreen() {
    const { colors } = useTheme();

    const handleGetStarted = () => {

        router.replace('/sleep/sleep');
    };

    return (
        <ImageBackground
            source={require('../../../assets/sleep-welcome-bg.png')}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome to Sleep</Text>
                    <Text style={styles.subtitle}>
                        Explore the new king of sleep. It uses sound and visualization to create perfect conditions for refreshing sleep.
                    </Text>
                </View>


                <View style={styles.footer}>
                    <Pressable
                        onPress={handleGetStarted}
                        style={[styles.button, { backgroundColor: colors.primary }]}
                    >
                        <Text style={styles.buttonText}>GET STARTED</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1 
    },
    safeArea: { 
        flex: 1, 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    },
    header: { 
        marginTop: 80, 
        alignItems: 'center', 
        paddingHorizontal: 40 
    },
    title: { 
        color: 'white', 
        fontSize: 30, 
        fontWeight: 'bold', 
        textAlign: 'center' 
    },
    subtitle: { 
        color: '#EBEAEC', 
        fontSize: 16, 
        textAlign: 'center', 
        marginTop: 20, 
        lineHeight: 24 
    },
    birdsImage: { 
        width: 300, 
        height: 150, 
        resizeMode: 'contain' 
    },
    footer: { 
        width: '100%', 
        paddingHorizontal: 40, 
        paddingBottom: 40 
    },
    button: { 
        paddingVertical: 20, 
        borderRadius: 30, 
        alignItems: 'center' 
    },
    buttonText: { 
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: 16 },
});