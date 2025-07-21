import { View, Text, ViewStyle } from 'react-native';
import { useTheme } from '../../components/ThemeProvider';

type CardProps = {
    title: string;
    subtitle: string;
    caption: string;
    style?: ViewStyle;
};

export default function Card({ title, subtitle, caption, style = {} }: CardProps) {
    const { colors } = useTheme();

    return (
        <View style={{
            backgroundColor: colors.card,
            borderRadius: 15,
            padding: 15,
            ...style,
        }}>
            <Text style={{
                fontSize: 16,
                fontWeight: '600',
                color: colors.text,
                marginBottom: 5,
            }}>
                {title}
            </Text>

            <Text style={{
                fontSize: 14,
                color: colors.text,
                opacity: 0.7,
                marginBottom: 5,
            }}>
                {subtitle}
            </Text>

            <Text style={{
                fontSize: 12,
                color: colors.primary,
                fontWeight: '600',
            }}>
                {caption}
            </Text>
        </View>
    );
}