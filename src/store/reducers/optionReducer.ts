import { IOption } from '../../pages/Main/types/types';

const FETCH_OPTION = 'FETCH_OPTION';
const FETCH_OPTION_SUCCESS = 'FETCH_OPTION_SUCCESS';
const FETCH_OPTION_ERROR = 'FETCH_OPTION_ERROR';

interface OptionState {
  options: IOption[];
  loading: boolean;
  error: null | string;
}
const initialState: OptionState = {
  options: [],
  loading: false,
  error: null
};

export const optionReducer = (state = initialState, action): OptionState => {
  switch (action.type) {
    case FETCH_OPTION:
      return { loading: true, error: null, options: [] };
    case FETCH_OPTION_SUCCESS:
      return { loading: true, error: null, options: [] };
    case FETCH_OPTION_ERROR:
      return { loading: true, error: null, options: [] };
    default:
      return state;
  }
};
