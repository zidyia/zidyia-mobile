// Import Character Typing
import { IActivity } from './activity.reducer';

// Create Action Constants
export enum ActivityActionTypes {
  GET_ALL = 'GET_ALL',
}

// Interface for Get All Action Type
export interface IActivityGetAllAction {
  type: ActivityActionTypes.GET_ALL;
  activities: IActivity[];
}


export type ActivityActions = IActivityGetAllAction;
