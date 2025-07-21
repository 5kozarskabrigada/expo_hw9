import { Text as RNText, TextStyle } from 'react-native';
import { useTheme } from '../ThemeProvider';

type TextProps = {
    children: React.ReactNode;
    style?: TextStyle;
};

export default function Text({ children, style = {} }: TextProps) {
    const { colors } = useTheme();

    return (
        <RNText style={{ color: colors.text, ...style }}>
            {children}
        </RNText>
    );
}