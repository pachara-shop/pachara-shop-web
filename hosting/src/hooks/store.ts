import { productAPI } from './slices/productAPI';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { authAPI } from './slices/authAPI';
import { categoryAPI } from './slices/categoryAPI';
import { productFeAPI } from './slices/fe/productAPI';

export const makeStore = (): EnhancedStore => {
  return configureStore({
    reducer: {
      [productAPI.reducerPath]: productAPI.reducer,
      [categoryAPI.reducerPath]: categoryAPI.reducer,
      [authAPI.reducerPath]: authAPI.reducer,
      [productFeAPI.reducerPath]: productFeAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        productAPI.middleware,
        categoryAPI.middleware,
        authAPI.middleware,
        productFeAPI.middleware
      ),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
