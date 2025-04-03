import { axiosInternalBaseQuery } from '@/lib/axiosBaseQuery';
import { IResponse } from '@/shared/models/Response';
import { SettingSocialMedia } from '@/shared/models/Settings';
import { createApi } from '@reduxjs/toolkit/query/react';

export const settingSocialAPI = createApi({
  reducerPath: 'settingSocialAPI',
  baseQuery: axiosInternalBaseQuery(),
  tagTypes: ['setting-social-media'],
  endpoints: (builder) => ({
    getSettingSocial: builder.query<IResponse<SettingSocialMedia[]>, void>({
      query: (params) => ({
        url: '/api/be/settings/social-media',
        method: 'GET',
        params,
      }),
      providesTags: ['setting-social-media'],
    }),
    addSettingSocial: builder.mutation<
      IResponse<SettingSocialMedia[]>,
      FormData
    >({
      query: (body) => ({
        url: '/api/be/settings/social-media',
        method: 'POST',
        data: body,
      }),
    }),
    updateSettingSocial: builder.mutation<
      IResponse<void>,
      SettingSocialMedia[]
    >({
      query: (body) => ({
        url: '/api/be/settings/social-media',
        method: 'PUT',
        data: body,
      }),
    }),
    deleteSettingSocial: builder.mutation<IResponse<void>, string>({
      query: (id) => ({
        url: '/api/be/settings/social-media/' + id,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetSettingSocialQuery,
  useAddSettingSocialMutation,
  useDeleteSettingSocialMutation,
  useUpdateSettingSocialMutation,
} = settingSocialAPI;
