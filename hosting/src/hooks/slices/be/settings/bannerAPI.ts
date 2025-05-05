import { axiosInternalBaseQuery } from '@/lib/axiosBaseQuery';
import { IResponse } from '@/shared/models/Response';
import { SettingBanner } from '@/shared/models/Settings';
import { createApi } from '@reduxjs/toolkit/query/react';

export const settingBannerAPI = createApi({
  reducerPath: 'settingBannerAPI',
  baseQuery: axiosInternalBaseQuery(),
  tagTypes: ['setting-banner'],
  endpoints: (builder) => ({
    getSettingBanners: builder.query<IResponse<SettingBanner[]>, void>({
      query: (params) => ({
        url: '/api/be/settings/banners',
        method: 'GET',
        params,
      }),
      providesTags: ['setting-banner'],
    }),
    addSettingBanners: builder.mutation<IResponse<SettingBanner[]>, FormData>({
      query: (body) => ({
        url: '/api/be/settings/banners',
        method: 'POST',
        data: body,
      }),
    }),
    deleteSettingBanners: builder.mutation<IResponse<void>, string>({
      query: (id) => ({
        url: '/api/be/settings/banners/' + id,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetSettingBannersQuery,
  useAddSettingBannersMutation,
  useDeleteSettingBannersMutation,
} = settingBannerAPI;
