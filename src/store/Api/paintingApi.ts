import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPainting } from '../../types/interfaces';
import { getPageCount } from '../../utils/getPageCount';
import { removeEmptyKeys } from '../../utils/removeEmptyKeys';
import { IIncomingParamsForPaintings } from '../../types/types';

export const paintingApi = createApi({
    reducerPath: 'paintingApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
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
            transformResponse(resolve, meta) {
                return {
                    paintings: resolve as IPainting[],
                    totalPages: getPageCount(
                        Number(meta?.response?.headers.get('X-Total-Count'))
                    )
                };
            }
        })
    })
});

export const { useGetPaintingsQuery } = paintingApi;
