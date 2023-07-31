import { AuthorAction, AuthorActionTypes, AuthorState } from '../../types/author';

const initialState: AuthorState = {
  options: [],
  loading: false,
  error: null
};

export const authorReducer = (
  state = initialState,
  action: AuthorAction
): AuthorState => {
  switch (action.type) {
    case AuthorActionTypes.FETCH_AUTHORS:
      return { loading: true, error: null, options: [] };
    case AuthorActionTypes.FETCH_AUTHORS_SUCCESS:
      return { loading: false, error: null, options: action.payload };
    case AuthorActionTypes.FETCH_AUTHORS_ERROR:
      return { loading: false, error: action.payload, options: [] };
    default:
      return state;
  }
};
