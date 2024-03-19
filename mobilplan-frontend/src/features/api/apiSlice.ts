// src/app/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';
import { isTokenExpired } from '../../utils/jwtHelper';
import { refreshToken as refreshAuthToken, setToken, logout } from '../../features/auth/authSlice'; // Ação para atualizar tokens


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8081/v1',
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401 && !args.url.endsWith('/auth/refresh')) {
        const state: RootState = api.getState();

        if (isTokenExpired(state.auth.refreshToken)) {
            // Se o refresh token também expirou, desloga o usuário
            api.dispatch(logout());
        } else {
            // Tenta atualizar o token
            const refreshResult = await api.dispatch(refreshAuthToken(state.auth.refreshToken as string));

            if (refreshResult.meta.requestStatus === 'fulfilled') {
                // Token atualizado com sucesso, tenta a requisição original novamente
                result = await baseQuery(args, api, extraOptions);
            }
        }
    }

    return result;
};
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Ferragens'],
    endpoints: () => ({}),
});