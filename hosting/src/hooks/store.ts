import { productAPI } from './slices/productAPI';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { authAPI } from './slices/authAPI';
import { categoryAPI } from './slices/categoryAPI';
import { productFeAPI } from './slices/fe/productAPI';
import { productGalleryAPI } from './slices/productGalleryAPI';
import layoutSlice from './slices/layoutSlice';
import { rteAPI } from './slices/rte/rteAPI';

export const makeStore = (): EnhancedStore => {
  return configureStore({
    reducer: {
      [productAPI.reducerPath]: productAPI.reducer,
      [categoryAPI.reducerPath]: categoryAPI.reducer,
      [authAPI.reducerPath]: authAPI.reducer,
      [productFeAPI.reducerPath]: productFeAPI.reducer,
      [productGalleryAPI.reducerPath]: productGalleryAPI.reducer,
      [rteAPI.reducerPath]: rteAPI.reducer,
      layout: layoutSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        productAPI.middleware,
        productGalleryAPI.middleware,
        categoryAPI.middleware,
        authAPI.middleware,
        productFeAPI.middleware,
        rteAPI.middleware
      ),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
