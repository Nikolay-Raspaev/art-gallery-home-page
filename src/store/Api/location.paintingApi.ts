import { ILocation } from '../../types/interfaces';
import { paintingApi } from './paintingApi';

export const locationPaintingApi = paintingApi.injectEndpoints({
    endpoints: (build) => ({
        getLocations: build.query<ILocation[], null>({
            query: () => `/locations`
        })
    })
});

export const { useGetLocationsQuery } = locationPaintingApi;
