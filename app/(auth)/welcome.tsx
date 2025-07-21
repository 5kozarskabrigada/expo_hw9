import { View, Text, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '../../components/ThemeProvider';


export default function WelcomeScreen() {
    const { colors } = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>

            <Image
                source={require('../../assets/welcome-illustration.png')}
                style={{ width: 390, height: 470, marginBottom: 40, marginTop: -200 }}
            />

            <Text style={{ fontSize: 24, fontWeight: 700, color: colors.text, marginBottom: 20, fontFamily: 'HelveticaNeue' }}>
                We are what we do
            </Text>
            <Text style={{
                fontSize: 12, color: colors.text, marginBottom: 20, textAlign: 'center', fontFamily: 'HelveticaNeue'
             }}>
                Thousand of people are usign silent moon 
                for smalls meditation 
            </Text>

            <Link href="/(auth)/signup" asChild>
                <Pressable style={{
                    backgroundColor: colors.primary,
                    padding: 20,
                    borderRadius: 30,
                    width: '80%',
                    alignItems: 'center',
                    marginBottom: 20
                }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>SIGN UP</Text>
                </Pressable>
            </Link>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                <Text style={{ color: colors.text, fontFamily: 'HelveticaNeue' }}>ALREADY HAVE AN ACCOUNT? </Text>
                <Link href="/(auth)/signin" asChild>
                    <Pressable>
                        <Text style={{ color: colors.primary, fontWeight: '600', fontFamily: 'HelveticaNeue' }}>LOG IN</Text>
                    </Pressable>
                </Link>
            </View>

           
        </View>
    );
}