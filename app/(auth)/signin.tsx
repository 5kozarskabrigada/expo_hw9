import { useState } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../components/ThemeProvider';
import Entypo from '@expo/vector-icons/Entypo';


export default function SignInScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const { colors } = useTheme();

    const handleLogin = async () => {
        try {
            await login(email, password);
            router.replace('/(onboarding)/welcome');
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        
        <View style={{ flex: 1, padding: 20, backgroundColor: colors.background }}>

            <Pressable
                onPress={() => router.back()}
                style={{
                    marginTop: 40,
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Entypo name="chevron-left" size={24} color="black" />
            </Pressable>



            <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.text, marginBottom: 40, marginTop: 70, textAlign: 'center' }}>
                Welcome Back
            </Text>

            <Pressable style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 15,
                borderWidth: 1,
                borderColor: "#7583CA",
                backgroundColor: '#7583CA',
                borderRadius: 28,
                marginBottom: 15
            }}>
                <Image
                    source={require('../../assets/facebook-icon.png')}
                    style={{ width: 20, height: 20, marginRight: 10 }}
                />
                <Text style={{ color: colors.text }}>Continue with Facebook</Text>

            </Pressable>

            <Pressable style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 15,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 28
            }}>
                <Image
                    source={require('../../assets/google-icon.png')}
                    style={{ width: 20, height: 20, marginRight: 10 }}
                />
                <Text style={{ color: colors.text }}>Continue with Google</Text>
            </Pressable>


            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 40 }}>
                <View style={{ flex: 1, height: 1}} />
                <Text style={{ marginHorizontal: 10, color: colors.text }}>or log in with email</Text>
                <View style={{ flex: 1, height: 1}} />
            </View>


            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{
                    padding: 15,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: 10,
                    marginBottom: 15,
                    backgroundColor: colors.card,
                    color: colors.text,
                }}
            />

            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{
                    padding: 15,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: 10,
                    marginBottom: 15,
                    backgroundColor: colors.card,
                    color: colors.text,
                }}
            />

            <Pressable
                onPress={handleLogin}
                style={{
                    backgroundColor: colors.primary,
                    padding: 15,
                    borderRadius: 30,
                    alignItems: 'center',
                    marginVertical: 20
                }}
            >
                <Text style={{ color: 'white', fontWeight: 100, fontFamily: 'HelveticaNeue'}}>Log in</Text>
            </Pressable>

            <Pressable style={{ alignSelf: 'center', marginBottom: 30 }}>
                <Text style={{ color: colors.primary }}>Forgot password?</Text>
            </Pressable>

           

        </View>
    );
}