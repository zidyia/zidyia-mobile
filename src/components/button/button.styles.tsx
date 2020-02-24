import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    button: {
        display: 'flex',
        height: 50,
        borderRadius: 5,
        justifyContent:'center',
        alignItems:'center',
        padding: 10,
        backgroundColor: '#2AC062',
        shadowColor:'#2AC062',
        shadowOpacity: 0.4,
        shadowOffset: {width: 0, height: 10},
        margin: 10,
        borderWidth: 1.5,
        borderColor: '#787878'
    },
    text: {
        fontSize: 16,
        textTransform: 'uppercase',
        color: '#FFFFFF'
    }
});