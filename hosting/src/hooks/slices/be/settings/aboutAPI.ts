import { axiosInternalBaseQuery } from '@/lib/axiosBaseQuery';
import { IResponse } from '@/shared/models/Response';
import { createApi } from '@reduxjs/toolkit/query/react';

export const settingAboutAPI = createApi({
  reducerPath: 'settingAboutAPI',
  baseQuery: axiosInternalBaseQuery(),
  tagTypes: ['setting-about'],
  endpoints: (builder) => ({
    getSettingAbout: builder.query<IResponse<string>, void>({
      query: () => ({
        url: '/api/be/settings/about',
        method: 'GET',
      }),
    }),
    updateSettingAbout: builder.mutation<IResponse<void>, string>({
      query: (data) => ({
        url: '/api/be/settings/about',
        method: 'PUT',
        data: { data },
      }),
    }),
  }),
});

export const { useGetSettingAboutQuery, useUpdateSettingAboutMutation } =
  settingAboutAPI;
