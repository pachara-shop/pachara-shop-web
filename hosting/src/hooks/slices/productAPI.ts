import { axiosBaseQuery } from '@/lib/axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const productAPI = createApi({
  reducerPath: 'productAPI',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.mutation({
      query: () => ({
        url: '/products',
        method: 'GET',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});
