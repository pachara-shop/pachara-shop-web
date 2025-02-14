import { axiosInternalBaseQuery } from '@/lib/axiosBaseQuery';
import { IProduct } from '@/shared/models/Product';
import { IResponse } from '@/shared/models/Response';
import { ISearchParams } from '@/shared/models/Search';
import { createApi } from '@reduxjs/toolkit/query/react';

export const productAPI = createApi({
  reducerPath: 'productAPI',
  baseQuery: axiosInternalBaseQuery(),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getFrontendProducts: builder.mutation<IResponse<IProduct[]>, void>({
      query: () => ({
        url: '/api/product/fe',
        method: 'GET',
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
    createProduct: builder.mutation<IResponse<IProduct>, IProduct>({
      query: (product) => ({
        url: '/api/product',
        method: 'POST',
        data: product,
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetFrontendProductsMutation,
  useSearchProductsMutation,
  useCreateProductMutation,
} = productAPI;
