import { IAuthor } from '../../types/interfaces';
import { paintingApi } from './paintingApi';

export const authorPaintingApi = paintingApi.injectEndpoints({
    endpoints: (build) => ({
        getAuthors: build.query<IAuthor[], null>({
            query: () => ({
                url: `/authors`
            })
        })
    })
});

export const { useGetAuthorsQuery } = authorPaintingApi;
