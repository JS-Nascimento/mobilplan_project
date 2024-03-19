import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {apiSlice} from "../features/api/apiSlice";
import {ferragensApiSlice} from "../features/materiaPrima/ferragem/ferragemSlice";
import {authSlice} from "../features/auth/authSlice";


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [ferragensApiSlice.reducerPath]: ferragensApiSlice.reducer,
        auth: authSlice.reducer,
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
