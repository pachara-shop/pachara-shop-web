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
  }),
});

export const { useGetSettingSocialQuery, useUpdateSettingSocialMutation } =
  settingSocialAPI;
