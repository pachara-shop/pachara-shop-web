import { productAPI } from './slices/productAPI';
import { categoryAPI } from './slices/CategoryAPI';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';

export const makeStore = (): EnhancedStore => {
  return configureStore({
    reducer: {
      [productAPI.reducerPath]: productAPI.reducer,
      [categoryAPI.reducerPath]: categoryAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        productAPI.middleware,
        categoryAPI.middleware
      ),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
