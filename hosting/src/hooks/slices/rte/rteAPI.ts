import { axiosInternalBaseQuery } from '@/lib/axiosBaseQuery';
import { IResponse } from '@/shared/models/Response';
import { createApi } from '@reduxjs/toolkit/query/react';

export const rteAPI = createApi({
  reducerPath: 'rteAPI',
  baseQuery: axiosInternalBaseQuery(),
  tagTypes: ['rte'],
  endpoints: (builder) => ({
    uploadRTEFile: builder.mutation<IResponse<string>, FormData>({
      query: (data) => ({
        url: `api/rte/upload`,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['rte'],
    }),
  }),
});
export const { useUploadRTEFileMutation } = rteAPI;
