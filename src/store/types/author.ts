import { IAuthor } from '../../pages/Main/types/interfaces';

export interface AuthorState {
  authors: IAuthor[];
  loading: boolean;
  error: null | string;
}

export enum AuthorActionTypes {
  FETCH_AUTHORS = 'FETCH_AUTHORS',
  FETCH_AUTHORS_SUCCESS = 'FETCH_AUTHORS_SUCCESS',
  FETCH_AUTHORS_ERROR = 'FETCH_AUTHORS_ERROR'
}
export interface FetchAuthorsAction {
  type: AuthorActionTypes.FETCH_AUTHORS;
}

export interface FetchAuthorsSuccessAction {
  type: AuthorActionTypes.FETCH_AUTHORS_SUCCESS;
  payload: IAuthor[];
}

export interface FetchAuthorsErrorAction {
  type: AuthorActionTypes.FETCH_AUTHORS_ERROR;
  payload: string;
}

export type AuthorAction =
  | FetchAuthorsAction
  | FetchAuthorsSuccessAction
  | FetchAuthorsErrorAction;
