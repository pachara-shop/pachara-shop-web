import { configureStore } from '@reduxjs/toolkit';
import { productAPI } from './slices/productAPI';


export const makeStore = () => {
  return configureStore(
    {
      reducer: {
        [productAPI.reducerPath]: productAPI.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productAPI.middleware),
    }
  );
};


export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];