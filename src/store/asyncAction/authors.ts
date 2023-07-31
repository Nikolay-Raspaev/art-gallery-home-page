import { Dispatch } from 'redux';
import { IOption } from '../../pages/Main/types/types';
import { instance } from '../../pages/Main/API/Instance';
import { AuthorAction, AuthorActionTypes } from '../../types/author';

export const fetchAuthors = (): any => {
  return async (dispatch: Dispatch<AuthorAction>) => {
    try {
      dispatch({ type: AuthorActionTypes.FETCH_AUTHORS });
      const response = await instance.get<IOption[]>(`/authors`);
      dispatch({ type: AuthorActionTypes.FETCH_AUTHORS_SUCCESS, payload: response.data });
    } catch (e) {
      dispatch({
        type: AuthorActionTypes.FETCH_AUTHORS_ERROR,
        payload: 'Произошла ошибка при загрузке опций'
      });
    }
  };
};

/*
export const getAuthors = async (): Promise<IOption[]> =>
  (await instance.get<IOption[]>(`/authors`)).data;
*/
