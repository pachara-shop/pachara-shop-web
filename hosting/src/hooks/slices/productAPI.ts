import { axiosInternalBaseQuery } from '@/lib/axiosBaseQuery';
import { IProduct } from '@/shared/models/Product';
import { IResponse } from '@/shared/models/Response';
import { ISearchParams, SearchProductsParams } from '@/shared/models/Search';
import { createApi } from '@reduxjs/toolkit/query/react';

export const productAPI = createApi({
  reducerPath: 'productAPI',
  baseQuery: axiosInternalBaseQuery(),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    searchFrontendProducts: builder.mutation<
      IResponse<IProduct[]>,
      SearchProductsParams
    >({
      query: (params) => ({
        url: '/api/product/fe',
        method: 'GET',
        params,
      }),
      invalidatesTags: ['Product'],
    }),
    searchProducts: builder.mutation<IResponse<IProduct[]>, ISearchParams>({
      query: (params) => ({
        url: '/api/product',
        method: 'GET',
        params: params,
      }),
      invalidatesTags: ['Product'],
    }),
    getProductById: builder.query<IResponse<IProduct>, string>({
      query: (id) => ({
        url: '/api/product/' + id,
        method: 'GET',
      }),
      providesTags: ['Product'],
    }),
    createProduct: builder.mutation<IResponse<IProduct>, FormData>({
      query: (data) => ({
        url: '/api/product',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation<IResponse<IProduct>, FormData>({
      query: (data) => ({
        url: '/api/product/' + data.get('id'),
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: '/api/product/' + id,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useSearchFrontendProductsMutation,
  useSearchProductsMutation,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productAPI;
