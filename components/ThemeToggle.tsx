import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <Pressable onPress={toggleTheme}>
            <Ionicons
                name={theme === 'dark' ? 'sunny' : 'moon'}
                size={24}
                color={theme === 'dark' ? 'white' : 'black'}
            />
        </Pressable>
    );
}