import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import ferragemSlice, {ferragensApiSlice} from '../features/materiaPrima/ferragem/ferragemSlice';
import {apiSlice} from "../features/api/apiSlice";


export const store = configureStore({
    reducer: {
        ferragens: ferragemSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
       // [ferragensApiSlice.reducerPath]: ferragensApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(apiSlice.middleware)

});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
