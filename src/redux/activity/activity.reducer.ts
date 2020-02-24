import { Reducer } from 'redux';
import {
  ActivityActions,
  ActivityActionTypes,
} from './activity.types';

export interface IActivity {
  title: string;
}

export interface IActivityState {
  readonly activities: IActivity[];
}

// Define the initial state
const initialActivityState: IActivityState = {
  activities: [],
};

export const activitiesReducer: Reducer<IActivityState, ActivityActions> = (
  state = initialActivityState,
  action
) => {
  switch (action.type) {
    case ActivityActionTypes.GET_ALL: {
      
      return {
        ...state,
        activities: action.activities,
      };
      
    }
    default:
      return state;
  }
};