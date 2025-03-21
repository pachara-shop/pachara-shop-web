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
  useSearchProductsMutation,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productAPI;
