import { IViewPainting } from '../pages/Main/types/types';

export interface PageState {
  options: IViewPainting[];
  loading: boolean;
  error: null | string;
  page: number;
  limit: number;
}

export enum PageActionTypes {
  FETCH_PAGES = 'FETCH_PAGES',
  FETCH_PAGES_SUCCESS = 'FETCH_PAGES_SUCCESS',
  FETCH_PAGES_ERROR = 'FETCH_PAGES_ERROR',
  SET_TODO_PAGE = 'SET_TODO_PAGE'
}
export interface FetchAuthorsAction {
  type: PageActionTypes.FETCH_PAGES;
}

export interface FetchAuthorsSuccessAction {
  type: PageActionTypes.FETCH_PAGES_SUCCESS;
  payload: IViewPainting[];
}

export interface FetchAuthorsErrorAction {
  type: PageActionTypes.FETCH_PAGES_ERROR;
  payload: string;
}

export type AuthorAction =
  | FetchAuthorsAction
  | FetchAuthorsSuccessAction
  | FetchAuthorsErrorAction;
