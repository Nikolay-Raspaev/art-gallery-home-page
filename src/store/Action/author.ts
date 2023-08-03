import { Dispatch } from 'redux';
import { IAuthor } from '../../pages/Main/types/types';
import { instance } from '../../pages/Main/API/Instance';
import { AuthorAction, AuthorActionTypes } from '../types/author';

export const fetchAuthors = () => {
  return async (dispatch: Dispatch<AuthorAction>) => {
    try {
      dispatch({ type: AuthorActionTypes.FETCH_AUTHORS });
      const response = await instance.get<IAuthor[]>(`/authors`);
      dispatch({ type: AuthorActionTypes.FETCH_AUTHORS_SUCCESS, payload: response.data });
    } catch (e) {
      dispatch({
        type: AuthorActionTypes.FETCH_AUTHORS_ERROR,
        payload: 'Произошла ошибка при загрузке автора'
      });
    }
  };
};
