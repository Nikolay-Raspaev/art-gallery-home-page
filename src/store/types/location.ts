import { ILocation } from '../../pages/Main/types/types';

export interface LocationState {
  locations: ILocation[];
  loading: boolean;
  error: null | string;
}

export enum LocationActionTypes {
  FETCH_LOCATIONS = 'FETCH_LOCATIONS',
  FETCH_LOCATIONS_SUCCESS = 'FETCH_LOCATIONS_SUCCESS',
  FETCH_LOCATIONS_ERROR = 'FETCH_LOCATIONS_ERROR'
}
export interface FetchLocationsAction {
  type: LocationActionTypes.FETCH_LOCATIONS;
}

export interface FetchLocationsSuccessAction {
  type: LocationActionTypes.FETCH_LOCATIONS_SUCCESS;
  payload: ILocation[];
}

export interface FetchLocationsErrorAction {
  type: LocationActionTypes.FETCH_LOCATIONS_ERROR;
  payload: string;
}

export type LocationAction =
  | FetchLocationsAction
  | FetchLocationsSuccessAction
  | FetchLocationsErrorAction;
