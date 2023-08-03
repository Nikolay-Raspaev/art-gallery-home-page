import { IPainting } from '../../pages/Main/types/types';

export interface PaintingState {
  paintings: IPainting[];
  loading: boolean;
  error: null | string;
}

export enum PaintingActionTypes {
  FETCH_PAINTINGS = 'FETCH_PAINTINGS',
  FETCH_PAINTINGS_SUCCESS = 'FETCH_PAINTINGS_SUCCESS',
  FETCH_PAINTINGS_ERROR = 'FETCH_PAINTINGS_ERROR'
}
export interface FetchPaintingsAction {
  type: PaintingActionTypes.FETCH_PAINTINGS;
}

export interface FetchPaintingsSuccessAction {
  type: PaintingActionTypes.FETCH_PAINTINGS_SUCCESS;
  payload: IPainting[];
}

export interface FetchPaintingsErrorAction {
  type: PaintingActionTypes.FETCH_PAINTINGS_ERROR;
  payload: string;
}

export type PaintingAction =
  | FetchPaintingsAction
  | FetchPaintingsSuccessAction
  | FetchPaintingsErrorAction;
