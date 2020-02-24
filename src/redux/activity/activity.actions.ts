// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import {IActivityGetAllAction,ActivityActionTypes} from './activity.types'
import { IActivityState } from './activity.reducer';
export const getAllActivities: ActionCreator<
  ThunkAction<Promise<any>, IActivityState, null, IActivityGetAllAction>
> = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      dispatch({
        activities: response.data.slice(0,20),
        type: ActivityActionTypes.GET_ALL,
      });
    } catch (err) {
      console.error(err);
    }
  };
};