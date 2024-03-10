import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import ferragemSlice from '../features/counter/materiaPrima/ferragem/ferragemSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    ferragens: ferragemSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
