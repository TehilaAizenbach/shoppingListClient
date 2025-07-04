import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './itemsSlice';
import categoriesReducer from './categoriesSlice';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
