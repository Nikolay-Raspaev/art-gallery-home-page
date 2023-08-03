import { AuthorAction, AuthorActionTypes, AuthorState } from '../types/author';

const initialState: AuthorState = {
  authors: [],
  loading: false,
  error: null
};

export const authorReducer = (
  state = initialState,
  action: AuthorAction
): AuthorState => {
  switch (action.type) {
    case AuthorActionTypes.FETCH_AUTHORS:
      return { loading: true, error: null, authors: [] };
    case AuthorActionTypes.FETCH_AUTHORS_SUCCESS:
      return { loading: false, error: null, authors: action.payload };
    case AuthorActionTypes.FETCH_AUTHORS_ERROR:
      return { loading: false, error: action.payload, authors: [] };
    default:
      return state;
  }
};
