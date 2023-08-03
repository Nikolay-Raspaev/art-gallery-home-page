import { LocationAction, LocationActionTypes, LocationState } from '../types/location';

const initialState: LocationState = {
  locations: [],
  loading: false,
  error: null
};

export const locationReducer = (
  state = initialState,
  action: LocationAction
): LocationState => {
  switch (action.type) {
    case LocationActionTypes.FETCH_LOCATIONS:
      return { loading: true, error: null, locations: [] };
    case LocationActionTypes.FETCH_LOCATIONS_SUCCESS:
      return { loading: false, error: null, locations: action.payload };
    case LocationActionTypes.FETCH_LOCATIONS_ERROR:
      return { loading: false, error: action.payload, locations: [] };
    default:
      return state;
  }
};
