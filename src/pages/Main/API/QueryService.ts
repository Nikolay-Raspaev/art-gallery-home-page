import { LIMIT } from '../Consts';
import { DateValue, ILocation, IOption, IPainting } from '../types/types';
import { instance } from './Instance';

interface IIncomingParamsForPaintings {
  currentPage: number;
  selectedAuthorID: number;
  selectedLocationId: number;
  paintingName: string;
  dateValue: DateValue;
}

export default class QueryService {
  static async getPaintings(
    incomingParamsForPaintings: IIncomingParamsForPaintings
  ) {
    const params = {
      _page: incomingParamsForPaintings.currentPage,
      _limit: LIMIT,
      ...(incomingParamsForPaintings.selectedAuthorID && {
        authorId: incomingParamsForPaintings.selectedAuthorID
      }),
      ...(incomingParamsForPaintings.selectedLocationId && {
        locationId: incomingParamsForPaintings.selectedLocationId
      }),
      ...(incomingParamsForPaintings.paintingName && {
        name: incomingParamsForPaintings.paintingName
      }),
      ...(incomingParamsForPaintings.dateValue?.from && {
        created_gte: incomingParamsForPaintings.dateValue?.from
      }),
      ...(incomingParamsForPaintings.dateValue?.before && {
        created_lte: incomingParamsForPaintings.dateValue?.before
      })
    };
    return instance.get<IPainting[]>('/paintings', { params });
  }

  static async getLocations() {
    return (await instance.get<ILocation[]>(`/locations`)).data?.map(
      (obj) =>
        <IOption>{
          id: obj.id,
          name: obj.location
        }
    );
  }

  static async getAuthors() {
    return (await instance.get<IOption[]>(`/authors`)).data;
  }
}
