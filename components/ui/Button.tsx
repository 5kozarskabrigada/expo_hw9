import { Pressable, Text, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../components/ThemeProvider';

type ButtonProps = {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
};

export default function Button({
    title,
    onPress,
    disabled = false,
    style = {},
    textStyle = {}
}: ButtonProps) {
    const { colors } = useTheme();

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => ({
                backgroundColor: disabled ? colors.border : colors.primary,
                padding: 15,
                borderRadius: 10,
                alignItems: 'center',
                opacity: pressed ? 0.8 : 1,
                ...style,
            })}
        >
            <Text style={{
                color: disabled ? colors.text : 'white',
                fontWeight: '600',
                ...textStyle,
            }}>
                {title}
            </Text>
        </Pressable>
    );
}