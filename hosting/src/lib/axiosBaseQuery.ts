import { AxiosError, AxiosRequestConfig } from 'axios';
import axiosInstance from './axiosInstance';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { setLoading } from '@/emitter/loadingEmitter';
import { getSession } from './session';
import { toast } from '@/hooks/use-toast';

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
      setLoading(true);
      const token = await getSession('session_token');
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({
        toastType: 'success',
        title: 'Success',
        description: 'Request completed successfully',
      });
      return { data: result.data };
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      const errorText =
        (error.response?.data as { message: string }).message || error.message;
      toast({
        toastType: 'error',
        title: error.response?.statusText,
        description: errorText,
      });
      return {
        error: {
          status: error.response?.status,
          data: error.response?.data || error.message,
        },
      };
    } finally {
      setLoading(false);
      toast({
        toastType: 'success',
        title: 'Success',
        description: 'Request completed successfully',
      });
    }
  };
