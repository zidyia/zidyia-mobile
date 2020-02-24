import React from 'react';
import { TouchableOpacity,StyleSheet,Text } from 'react-native';
import {styles} from './button.styles'
interface ButtonProps {
    title: string;
    style?: object;
    textStyle: object;
    onPress: any;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({title,style,textStyle,onPress,disabled}: ButtonProps) => {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.button, style]}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    )
}



