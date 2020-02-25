import * as React from "react";
import { Provider } from "react-redux";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from "./src/screens/login/login.component";
import { Store } from 'redux';
import { IAppState } from './src/redux/store/Store';
import configureStore from "./src/redux/store/store";
import ActivitiesScreen from "./src/screens/activity/activity.component";
import SplashScreen from "./src/screens/splash/splash.component";
import AsyncStorage from "@react-native-community/async-storage";
import ActivityDetail from "./src/screens/activity-detail/activity-detail.component";
import NavigationService from './src/navigation/NavigationService';
import OneSignal from 'react-native-onesignal';
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
    isLoading: true,
    notification: null
  }
  async componentDidMount() {
    AsyncStorage.getItem('authToken').then(response => {
      this.setState({ token: response, isLoading: false })
      OneSignal.init("b764778a-9597-493b-a11c-0edba7a6213f", {kOSSettingsKeyAutoPrompt : true});
      OneSignal.inFocusDisplaying(2);
      OneSignal.addEventListener('received', this.onReceived);
      OneSignal.addEventListener('opened', this.onOpened);
      OneSignal.addEventListener('ids', this.onIds);
      console.log(response)
    })
  }
  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification: any) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult: any) {
    
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
    NavigationService.navigate('ActivityDetail', { activity: openResult.notification.payload.title, details: openResult.notification.payload.body })
  }

  onIds(device: any) {
    console.log('Device info: ', device);
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
