import { limit } from '../Consts';
import { DateValue, IAuthor, ILocation, IPainting } from '../../Types/types';
import { instance } from './Instance';

interface incomingParamsForPaintings {
  currentPage: number;
  selectedAuthorID: number;
  selectedLocationId: number;
  paintingName: string;
  dateValue: DateValue;
}

export default class QueryService {
  static async getPaintings(
    incomingParamsForPaintings: incomingParamsForPaintings
  ) {
    const params = {
      _page: incomingParamsForPaintings.currentPage,
      _limit: limit,
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
    return (await instance.get<ILocation[]>(`/locations`)).data;
  }

  static async getAuthors() {
    return (await instance.get<IAuthor[]>(`/authors`)).data;
  }
}
