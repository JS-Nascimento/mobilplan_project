import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {decodeJwt} from "../../utils/jwtHelper";

interface UserDetails {
    email: string;
    name: string;
    id: string;
    roles: string[];
}

interface AuthState {
    isAuthenticated: boolean;
    isFetching: boolean;
    userDetails: UserDetails | null; // Substitua `any` pelo tipo adequado conforme sua aplicação
    token: string | null;
    refreshToken: string | null;
}


const initialState: AuthState = {
    isAuthenticated: false,
    isFetching: false,
    userDetails: null,
    token: null,
    refreshToken: null,
};

export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (refreshToken: string, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8081/auth/refresh', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken }),
            });

            if (!response.ok) {
                throw new Error('Falha ao atualizar token');
            }

            const data = await response.json();
            return { accessToken: data.accessToken, refreshToken: data.refreshToken };
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Erro desconhecido');
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserDetails: (state, action: PayloadAction<UserDetails>) => {
            state.userDetails = action.payload;
        },
        setAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        login: (state, action: PayloadAction<{accessToken: string; refreshToken: string}>) => {
            const userDetails = decodeJwt(action.payload.accessToken);
            state.isAuthenticated = true;
            state.token = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.userDetails = {
                email: userDetails.sub, // Ajuste com base na estrutura do seu token
                name: userDetails.nome, // Ajuste conforme necessário
                id: userDetails.userId,
                roles: userDetails.roles || [],// 'sub' geralmente é usado como ID do usuário no JWT
            };
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.refreshToken = null;
            state.userDetails = null;
        },
        // Modificada para receber um objeto com ambos tokens
        setToken: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
            state.token = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        setFetching: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Tratamento do estado pending do refreshToken
            .addCase(refreshToken.pending, (state) => {
                state.isFetching = true;
            })
            // Tratamento do estado fulfilled do refreshToken
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.token = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.isAuthenticated = true; // Supondo que a atualização bem-sucedida mantenha o usuário autenticado
                state.isFetching = false;
            })
            // Tratamento do estado rejected do refreshToken
            .addCase(refreshToken.rejected, (state, action) => {
                state.isFetching = false;
                // Aqui você pode definir mais ações, como mostrar uma mensagem de erro
                // ou deslogar o usuário
                console.error('Falha ao atualizar o token:', action.payload);
            });
    },
});

export const { setAuthenticated, login, logout, setToken, setFetching, setUserDetails } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState): boolean => state.auth.isAuthenticated;
export const selectIsFetching = (state: RootState): boolean => state.auth.isFetching;