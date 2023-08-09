import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAuthor, ILocation, IPainting } from '../../pages/Main/types/interfaces';
import { getPageCount } from '../../pages/Main/utils/pages';

export type IIncomingParamsForPaintings = {
    _page: number;
    authorId: number;
    locationId: number;
    name: string;
    created_gte: string;
    created_lte: string;
};

const removeEmptyKeys = (obj: object) => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value));
};

export const paintingAPI = createApi({
    reducerPath: 'paintingAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://test-front.framework.team' }),
    endpoints: (build) => ({
        getPaintings: build.query<
            { paintings: IPainting[]; totalPages: number },
            IIncomingParamsForPaintings
        >({
            query: (incomingParamsForPaintings) => ({
                url: `/paintings`,
                params: {
                    ...removeEmptyKeys(incomingParamsForPaintings)
                }
            }),
            transformResponse(paintings, meta) {
                return {
                    paintings: paintings as IPainting[],
                    totalPages: getPageCount(
                        Number(meta?.response?.headers.get('X-Total-Count'))
                    )
                };
            }
        }),
        getAuthors: build.query<IAuthor[], null>({
            query: () => ({
                url: `/authors`
            })
        }),

        getLocations: build.query<ILocation[], null>({
            query: () => `/locations`
        })
    })
});
