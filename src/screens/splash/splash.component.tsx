import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'

interface AuthProps {
  navigation: any;
}

export default class SplashScreen extends React.Component<AuthProps> {
  static navigationOptions: {
    cardStyle: {
      backgroundColor: '#3e424b'
    },
    header: null
  }
  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('authToken');
    console.log(userToken)
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}