import React from 'react';
import { TextInput,StyleSheet, View } from 'react-native';
import {styles} from './textinput.styles'
interface TextInputProps {
    hint: string;
    style: object;
    val?: string;
    secureInput?: boolean
    onChange: any;
}

export const Input: React.FC<TextInputProps> = ({style,hint,secureInput,val,onChange}: TextInputProps) => {
    return (
        <View style={styles.container}>
            <TextInput placeholderTextColor={"#FFF"} onChangeText={onChange}  value={val} style={[styles.textInput,style]} placeholder={hint} secureTextEntry={secureInput} />
        </View>
    )
}



