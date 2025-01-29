import { AxiosError, AxiosRequestConfig } from 'axios';
import axiosInstance from './axiosInstance';
import { BaseQueryFn } from '@reduxjs/toolkit/query';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  showToastError?: boolean;
  showToastSuccess?: boolean;
}
interface StateData {
  getState: () => unknown;
}

export const axiosInternalBaseQuery =
  (): BaseQueryFn<CustomAxiosRequestConfig, StateData, unknown> =>
    async ({ url, method, data, params }) => {
      try {
        const token = localStorage.getItem('token');
        const result = await axiosInstance({
          url,
          method,
          data,
          params,
          headers: { Authorization: `Bearer ${token}` },
        });
        return { data: result.data };
      } catch (axiosError) {
        const error = axiosError as AxiosError;
        return {
          error: {
            status: error.response?.status,
            data: error.response?.data || error.message,
          },
        };
      }
    };
