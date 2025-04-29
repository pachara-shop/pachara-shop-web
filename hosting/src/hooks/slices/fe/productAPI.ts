import { axiosInternalBaseQuery } from '@/lib/axiosBaseQuery';
import { IProduct } from '@/shared/models/Product';
import { ISearchResponse } from '@/shared/models/Response';
import { SearchProductsParams } from '@/shared/models/Search';
import { createApi } from '@reduxjs/toolkit/query/react';

export const productFeAPI = createApi({
  reducerPath: 'productFeAPI',
  baseQuery: axiosInternalBaseQuery(),
  tagTypes: ['product-fe'],
  endpoints: (builder) => ({
    searchFrontendProducts: builder.mutation<
      ISearchResponse<IProduct[]>,
      SearchProductsParams
    >({
      query: (params) => ({
        url: '/api/fe/product',
        method: 'GET',
        params,
      }),
      invalidatesTags: ['product-fe'],
    }),
    searchProductByCategory: builder.mutation<
      ISearchResponse<IProduct[]>,
      string
    >({
      query: (category) => ({
        url: '/api/fe/product/' + category,
        method: 'GET',
      }),
      invalidatesTags: ['product-fe'],
    }),
  }),
});

export const {
  useSearchFrontendProductsMutation,
  useSearchProductByCategoryMutation,
} = productFeAPI;
