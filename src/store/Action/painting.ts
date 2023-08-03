import { Dispatch } from 'redux';
import { AxiosHeaders } from 'axios';
import { PaintingAction, PaintingActionTypes } from '../types/painting';
import { instance } from '../../pages/Main/API/Instance';
import { IPainting } from '../../pages/Main/types/types';
import { LIMIT } from '../../pages/Main/Consts';
import {
  IIncomingParamsForPaintings,
  removeEmptyKeys
} from '../../pages/Main/API/QueryService';
import { getPageCount } from '../../pages/Main/utils/pages';

export const fetchPaintings = (
  incomingParamsForPaintings: IIncomingParamsForPaintings,
  setTotalPage: (totalPage: number) => void
) => {
  return async (dispatch: Dispatch<PaintingAction>) => {
    try {
      dispatch({ type: PaintingActionTypes.FETCH_PAINTINGS });
      const params = removeEmptyKeys(incomingParamsForPaintings);
      const response = await instance.get<IPainting[]>('/paintings', {
        params: { ...params, LIMIT }
      });
      const headers = response.headers as AxiosHeaders;
      const totalCount = Number(headers.get('x-total-count'));
      setTotalPage(getPageCount(totalCount));
      dispatch({
        type: PaintingActionTypes.FETCH_PAINTINGS_SUCCESS,
        payload: response.data
      });
    } catch (e) {
      dispatch({
        type: PaintingActionTypes.FETCH_PAINTINGS_ERROR,
        payload: 'Произошла ошибка при загрузке картин'
      });
    }
  };
};
