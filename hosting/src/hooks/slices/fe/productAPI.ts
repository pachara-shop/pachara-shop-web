import { axiosInternalBaseQuery } from '@/lib/axiosBaseQuery';
import { IProduct } from '@/shared/models/Product';
import { IResponse } from '@/shared/models/Response';
import { SearchProductsParams } from '@/shared/models/Search';
import { createApi } from '@reduxjs/toolkit/query/react';

export const productFeAPI = createApi({
  reducerPath: 'productFeAPI',
  baseQuery: axiosInternalBaseQuery(),
  tagTypes: ['product-fe'],
  endpoints: (builder) => ({
    searchFrontendProducts: builder.mutation<
      IResponse<IProduct[]>,
      SearchProductsParams
    >({
      query: (params) => ({
        url: '/api/fe/product',
        method: 'GET',
        params,
      }),
      invalidatesTags: ['product-fe'],
    }),
  }),
});

export const { useSearchFrontendProductsMutation } = productFeAPI;
