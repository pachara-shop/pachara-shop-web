import { axiosInternalBaseQuery } from '@/lib/axiosBaseQuery';
import { IProduct } from '@/shared/models/Product';
import { IResponse, ISearchResponse } from '@/shared/models/Response';
import { ISearchParams } from '@/shared/models/Search';
import { createApi } from '@reduxjs/toolkit/query/react';

export const productAPI = createApi({
  reducerPath: 'productAPI',
  baseQuery: axiosInternalBaseQuery(),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    searchProducts: builder.mutation<
      ISearchResponse<IProduct[]>,
      ISearchParams
    >({
      query: (params) => ({
        url: '/api/be/product',
        method: 'GET',
        params: params,
      }),
      invalidatesTags: ['Product'],
    }),
    createProduct: builder.mutation<IResponse<IProduct>, FormData>({
      query: (data) => ({
        url: '/api/be/product',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Product'],
    }),
    getProductById: builder.query<IResponse<IProduct>, string>({
      query: (id) => ({
        url: '/api/be/product/' + id,
        method: 'GET',
      }),
      providesTags: ['Product'],
    }),
    updateProduct: builder.mutation<IResponse<IProduct>, FormData>({
      query: (data) => ({
        url: '/api/be/product/' + data.get('id'),
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: '/api/be/product/' + id,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
    updateProductStatus: builder.mutation<
      IResponse<IProduct>,
      { id: string; data: { highlight: boolean } }
    >({
      query: ({ id, data }) => ({
        url: `/api/be/product/${id}/status`,
        method: 'PUT',
        data: data,
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useSearchProductsMutation,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUpdateProductStatusMutation,
} = productAPI;
