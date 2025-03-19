import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Replace with your actual API URL
  timeout: 60000,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error: AxiosError) =>
  // Handle request error
    Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) =>
  // Handle successful response
    response,
  (error: AxiosError) => {
    // Handle response errors
    // if (error.response?.status === 401) {
    //     console.error('Unauthorized! Redirecting to login...');
    //     if (typeof window !== 'undefined') {
    //         window.location.href = '/login';
    //     }
    // }

    return Promise.reject(error);
  }
);

export default axiosInstance;
