import { axiosInternalBaseQuery } from '@/lib/axiosBaseQuery';
import { ICategory } from '@/shared/models/Category';
import { ISearchResponse } from '@/shared/models/Response';
import { createApi } from '@reduxjs/toolkit/query/react';

export const categoryFeAPI = createApi({
  reducerPath: 'categoryFeAPI',
  baseQuery: axiosInternalBaseQuery(),
  tagTypes: ['category-fe'],
  endpoints: (builder) => ({
    getCategoryFE: builder.query<ISearchResponse<ICategory[]>, void>({
      query: () => ({
        url: '/api/fe/category',
        method: 'GET',
      }),
      providesTags: ['category-fe'],
    }),
  }),
});

export const { useGetCategoryFEQuery } = categoryFeAPI;
