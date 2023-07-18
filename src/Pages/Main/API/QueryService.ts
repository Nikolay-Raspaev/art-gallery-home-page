import { limit } from '../Consts';
import { IAxiosPainting } from './Interface';
import { instance } from './Instance';

export default class QueryService {
  // @ts-ignore
  static async getPaintings(incomingParams) {
    const url = `/paintings`;
    const params = {
      _page: incomingParams.currentPage,
      _limit: limit,
      ...(incomingParams.selectedAuthorID && {
        authorId: incomingParams.selectedAuthorID
      }),
      ...(incomingParams.selectedLocationId && {
        locationId: incomingParams.selectedLocationId
      }),
      ...(incomingParams.paintingName && {
        name: incomingParams.paintingName
      }),
      ...(incomingParams.dateValue?.from && {
        created_gte: incomingParams.dateValue?.from
      }),
      ...(incomingParams.dateValue?.before && {
        created_lte: incomingParams.dateValue?.before
      })
    };
    return instance.get<IAxiosPainting[]>(url, { params });
  }

  static async getLocations() {
    return (await instance.get(`/locations`)).data;
  }

  static async getAuthors() {
    return (await instance.get(`/authors`)).data;
  }
}
