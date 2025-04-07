import { axiosInternalBaseQuery } from '@/lib/axiosBaseQuery';
import { ICategory } from '@/shared/models/Category';
import { ISearchResponse } from '@/shared/models/Response';
import { ISearchParams } from '@/shared/models/Search';
import { createApi } from '@reduxjs/toolkit/query/react';

export const categoryAPI = createApi({
  reducerPath: 'categoryAPI',
  baseQuery: axiosInternalBaseQuery(),
  tagTypes: ['category'],
  endpoints: (builder) => ({
    searchCategory: builder.mutation<
      ISearchResponse<ICategory[]>,
      ISearchParams
    >({
      query: (params) => ({
        url: '/api/category',
        method: 'GET',
        params: params,
      }),
      invalidatesTags: ['category'],
    }),
    getCategoryById: builder.query<ISearchResponse<ICategory>, { id: string }>({
      query: ({ id }) => ({
        url: `/api/category/${id}`,
        method: 'GET',
      }),
      providesTags: ['category'],
    }),
    createCategory: builder.mutation<ISearchResponse<ICategory>, ICategory>({
      query: (category) => ({
        url: '/api/category',
        method: 'POST',
        data: category,
      }),
      invalidatesTags: ['category'],
    }),
    updateCategory: builder.mutation<
      ISearchResponse<ICategory>,
      { id: string; data: ICategory }
    >({
      query: ({ id, data }) => ({
        url: `/api/category/${id}`,
        method: 'PUT',
        data: data,
      }),
      invalidatesTags: ['category'],
    }),
    deleteCategory: builder.mutation<
      ISearchResponse<ICategory>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/api/category/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['category'],
    }),
    getCategoryOptions: builder.query<{ data: ICategory[] }, void>({
      query: () => ({
        url: '/api/fe/category',
        method: 'GET',
      }),
      providesTags: ['category'],
    }),
  }),
});

export const {
  useSearchCategoryMutation,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryOptionsQuery,
} = categoryAPI;
