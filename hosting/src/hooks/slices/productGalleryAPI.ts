import { axiosInternalBaseQuery } from '@/lib/axiosBaseQuery';
import { ISearchResponse } from '@/shared/models/Response';
import { createApi } from '@reduxjs/toolkit/query/react';

export const productGalleryAPI = createApi({
  reducerPath: 'productGAlleryAPI',
  baseQuery: axiosInternalBaseQuery(),
  tagTypes: ['productGallery'],
  endpoints: (builder) => ({
    getProductGalleryById: builder.query<ISearchResponse<string[]>, string>({
      query: (id) => ({
        url: '/api/product/' + id + '/gallery',
        method: 'GET',
      }),
      providesTags: ['productGallery'],
    }),
    uploadProductGallery: builder.mutation<
      void,
      { id: string; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: '/api/product/' + id + '/gallery',
        method: 'POST',
        data: formData,
      }),
      invalidatesTags: ['productGallery'],
    }),
    deleteProductGalleryById: builder.mutation<
      void,
      { id: string; image: string }
    >({
      query: ({ id, image }) => ({
        url: '/api/product/' + id + '/gallery',
        method: 'DELETE',
        data: { image },
      }),
      invalidatesTags: ['productGallery'],
    }),
  }),
});

export const {
  useGetProductGalleryByIdQuery,
  useUploadProductGalleryMutation,
  useDeleteProductGalleryByIdMutation,
} = productGalleryAPI;
