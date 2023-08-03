import { AxiosResponse } from 'axios';
import { instance } from './Instance';
import { IAuthor, ILocation, IPainting } from '../types/types';
import { LIMIT } from '../Consts';

export type IIncomingParamsForPaintings = {
  _page: number;
  authorId: number;
  locationId: number;
  name: string;
  created_gte: string;
  created_lte: string;
};
export const removeEmptyKeys = (obj: object) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value));
};
export default class QueryService {
  static async getPaintings(
    incomingParamsForPaintings: IIncomingParamsForPaintings
  ): Promise<AxiosResponse<IPainting[], any>> {
    const params = removeEmptyKeys(incomingParamsForPaintings);
    return instance.get<IPainting[]>('/paintings', {
      params: { ...params, LIMIT }
    });
  }

  static async getLocations(): Promise<ILocation[]> {
    return (await instance.get<ILocation[]>(`/locations`)).data;
  }

  static async getAuthors(): Promise<IAuthor[]> {
    return (await instance.get<IAuthor[]>(`/authors`)).data;
  }
}
