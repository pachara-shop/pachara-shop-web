import { axiosInternalBaseQuery } from '@/lib/axiosBaseQuery';
import { IResponse } from '@/shared/models/Response';
import { IUserProfile } from '@/shared/models/UserProfile';
import { createApi } from '@reduxjs/toolkit/query/react';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: axiosInternalBaseQuery(),
  tagTypes: ['userProfile'],
  endpoints: (builder) => ({
    login: builder.mutation<
      IResponse<IUserProfile>,
      { username: string; password: string }
    >({
      query: (data) => ({
        url: '/api/auth/login',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['userProfile'],
    }),
  }),
});

export const { useLoginMutation } = authAPI;
