import { axiosInternalBaseQuery } from '@/lib/axiosBaseQuery';
import { ICategory } from '@/shared/models/Category';
import { IResponse } from '@/shared/models/Response';
import { ISearchParams } from '@/shared/models/Search';
import { createApi } from '@reduxjs/toolkit/query/react';

export const categoryAPI = createApi({
  reducerPath: 'categoryAPI',
  baseQuery: axiosInternalBaseQuery(),
  tagTypes: ['category'],
  endpoints: (builder) => ({
    searchCategory: builder.mutation<IResponse<ICategory[]>, ISearchParams>({
      query: (params) => ({
        url: '/api/category',
        method: 'GET',
        params: params,
      }),
      invalidatesTags: ['category'],
    }),
    getCategoryById: builder.query<IResponse<ICategory>, { id: string }>({
      query: ({ id }) => ({
        url: `/api/category/${id}`,
        method: 'GET',
      }),
      providesTags: ['category'],
    }),
    createCategory: builder.mutation<IResponse<ICategory>, ICategory>({
      query: (category) => ({
        url: '/api/category',
        method: 'POST',
        data: category,
      }),
      invalidatesTags: ['category'],
    }),
    updateCategory: builder.mutation<
      IResponse<ICategory>,
      { id: string; data: ICategory }
    >({
      query: ({ id, data }) => ({
        url: `/api/category/${id}`,
        method: 'PUT',
        data: data,
      }),
      invalidatesTags: ['category'],
    }),
    deleteCategory: builder.mutation<IResponse<ICategory>, { id: string }>({
      query: ({ id }) => ({
        url: `/api/category/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['category'],
    }),
    getCategoryOptions: builder.query<{ data: ICategory[] }, void>({
      query: () => ({
        url: '/api/category/option',
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
