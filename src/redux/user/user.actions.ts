import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';
import Axios from 'axios';
import { login as LoginAction, logout as LogoutAction } from './user.types'
import AsyncStorage from "@react-native-community/async-storage";
import NavigationService from '../../navigation/NavigationService';

export const login = (username: string, password: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>((resolve) => {
      console.log('Login in progress')
      Axios({
        method: 'POST',
        url: 'http://www.mocky.io/v2/5e4be3543100006e00d8ba43',
        data: {
          username,
          password
        }
      }).then(response => {
        dispatch(LoginAction("34444"))
        NavigationService.navigate('App',{});
        AsyncStorage.setItem('authToken', "34343");
        console.log(response.data)
        console.log('Login done')
      })
    })
  }
}


export const logout = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>((resolve) => {
      dispatch(LogoutAction())
        AsyncStorage.removeItem('authToken').then(()=>{
          NavigationService.navigate('Auth',{});
          console.log('Logout done')
        });
    })
  }
}
