import { axiosInternalBaseQuery } from '@/lib/axiosBaseQuery';
import { IResponse } from '@/shared/models/Response';
import { SettingBanner } from '@/shared/models/Settings';
import { createApi } from '@reduxjs/toolkit/query/react';

export const settingFeAPI = createApi({
  reducerPath: 'settingFeAPI',
  baseQuery: axiosInternalBaseQuery(),
  tagTypes: ['setting-fe'],
  endpoints: (builder) => ({
    getSettingBanner: builder.query<IResponse<SettingBanner[]>, void>({
      query: (params) => ({
        url: '/api/fe/settings/banner',
        method: 'GET',
        params,
      }),
      providesTags: ['setting-fe'],
    }),
  }),
});

export const { useGetSettingBannerQuery } = settingFeAPI;
