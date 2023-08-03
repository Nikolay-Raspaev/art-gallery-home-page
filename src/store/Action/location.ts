import { Dispatch } from 'redux';
import { ILocation } from '../../pages/Main/types/types';
import { instance } from '../../pages/Main/API/Instance';
import { LocationAction, LocationActionTypes } from '../types/location';

export const fetchLocations = () => {
  return async (dispatch: Dispatch<LocationAction>) => {
    try {
      dispatch({ type: LocationActionTypes.FETCH_LOCATIONS });
      const response = await instance.get<ILocation[]>(`/locations`);
      dispatch({
        type: LocationActionTypes.FETCH_LOCATIONS_SUCCESS,
        payload: response.data
      });
    } catch (e) {
      dispatch({
        type: LocationActionTypes.FETCH_LOCATIONS_ERROR,
        payload: 'Произошла ошибка при загрузке автора'
      });
    }
  };
};
