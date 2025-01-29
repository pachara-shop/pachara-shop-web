import { axiosInternalBaseQuery } from '@/lib/axiosBaseQuery';
import { IProduct } from '@/shared/models/Product';
import { IResponse } from '@/shared/models/Response';
import { createApi } from '@reduxjs/toolkit/query/react';

export const productAPI = createApi({
  reducerPath: 'productAPI',
  baseQuery: axiosInternalBaseQuery(),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.mutation<IResponse<IProduct[]>,{filter:string}>({
      query: ({filter}) => ({
        url: '/api/product',
        method: 'GET',
        params: {filter},
      }),
      invalidatesTags: ['Product'],
    }),
    searchProducts: builder.mutation<IResponse<IProduct[]>, {filter:string}>({
      query: ({filter}) => ({
        url: '/api/product',
        method: 'GET',
        params: {filter},
      }),
      invalidatesTags: ['Product'],
    })
  }),
});


export const { useGetProductsMutation,useSearchProductsMutation } = productAPI;
