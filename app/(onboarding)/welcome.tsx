import { View, Text, Image, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '../../components/ThemeProvider';

export default function OnboardingWelcome() {
    const { colors } = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: '#8E97FD', justifyContent: 'center', alignItems: 'center' }}>
          
            <Image
                source={require('../../assets/logo.png')}
                style={{ width: 150, height: 20, marginBottom: 40, marginTop: -250, paddingBottom: 100 }}
            />

            <Image
                source={require('../../assets/welcome.png')}
                style={{ width: 300, height: 300, marginBottom: 40 }}
            />

            <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.text, marginBottom: 10 }}>
                Hi Afsar, Welcome to Silent Moon
            </Text>
            <Text style={{ fontSize: 16, color: colors.text, opacity: 0.7, marginBottom: 40, textAlign: 'center' }}>
                Explore the app, find some peace of mind to listen to.
            </Text>

            <Pressable
                onPress={() => router.push('/(onboarding)/choose-topic')}
                style={{
                    backgroundColor: '#EBEAEC',
                    padding: 20,
                    borderRadius: 30,
                    width: '80%',
                    alignItems: 'center'
                }}
            >
                <Text style={{ color: '#3F414E', fontWeight: 'bold', fontSize: 16 }}>Get Started</Text>
            </Pressable>
        </View>
    );
}