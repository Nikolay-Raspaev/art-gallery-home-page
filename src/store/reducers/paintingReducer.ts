import { PaintingAction, PaintingActionTypes, PaintingState } from '../types/painting';

const initialState: PaintingState = {
  paintings: [],
  error: null,
  loading: false
};

export const paintingReducer = (
  state = initialState,
  action: PaintingAction
): PaintingState => {
  switch (action.type) {
    case PaintingActionTypes.FETCH_PAINTINGS:
      return { ...state, loading: true };
    case PaintingActionTypes.FETCH_PAINTINGS_SUCCESS:
      return { ...state, loading: false, paintings: action.payload };
    case PaintingActionTypes.FETCH_PAINTINGS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
