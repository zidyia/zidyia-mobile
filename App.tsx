import * as React from "react";
import { Provider } from "react-redux";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from "./src/screens/login/login.component";
import firebase, { auth } from 'react-native-firebase';
import { Store } from 'redux';
import { IAppState } from './src/redux/store/Store';
import configureStore from "./src/redux/store/store";
import ActivitiesScreen from "./src/screens/activity/activity.component";
import SplashScreen from "./src/screens/splash/splash.component";
import AsyncStorage from "@react-native-community/async-storage";
import ActivityDetail from "./src/screens/activity-detail/activity-detail.component";
import { Platform, Alert } from "react-native";
import NavigationService from './src/navigation/NavigationService';

interface IProps {
  store: Store<IAppState>;
  removeNotificationDisplayedListener: any;
  removeNotificationListener: any;
}
const store = configureStore();
const prefix = 'myapp://';
const AppStack = createStackNavigator({
  Activities: {
    screen: ActivitiesScreen,
    path: 'activities'
  }, ActivityDetail: {
    screen: ActivityDetail,
    path: 'activitydetail'
  }
}, {
  defaultNavigationOptions: {
    cardStyle: {
      backgroundColor: "#3E424B"
    },
    headerShown: false
  }
});
const AuthStack = createStackNavigator({ Login: LoginScreen }, {
  defaultNavigationOptions: {
    cardStyle: {
      backgroundColor: "#3E424B"
    },
    headerShown: false
  }
});
const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: SplashScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ));
class App extends React.Component<IProps>{
  state = {
    token: null,
    isLoading: true
  }
  async componentDidMount() {
    AsyncStorage.getItem('authToken').then(response => {
      this.setState({ token: response, isLoading: false })
      console.log(response)
      firebase.notifications().getInitialNotification().then(() => { });

      // if (response != null) {
      //   console.log("1")
      firebase.notifications().onNotification((notification) => {
        if (Platform.OS === "android")
          notification
            .android.setChannelId("awesome_channel")
            .android.setSmallIcon('ic_launcher');
        // Build a channel
        const channelId = new firebase.notifications.Android.Channel("awesome_channel", "awesome_channel", firebase.notifications.Android.Importance.Max);

        // Create the channel
        firebase.notifications().android.createChannel(channelId);
        firebase.notifications().displayNotification(notification).then(()=>{}).catch((err)=>console.log(err))

      });
      firebase.notifications().onNotificationOpened((notificationOpen) => {
        NavigationService.navigate('Activities', {})
      });
      // }
    })
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer uriPrefix={prefix} ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }} />
      </Provider>
    )
  }
}

export default App;
