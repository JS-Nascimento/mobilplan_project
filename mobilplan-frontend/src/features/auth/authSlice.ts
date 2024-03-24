import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {decodeJwt} from "../../utils/jwtHelper";
import {Usuario} from "../../types/usuario";

interface UserDetails {
    email: string;
    name: string;
    id: string;
    roles: string[];
    image: string;
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

export const logoutAsync = createAsyncThunk('auth/logoutAsync', async (_, {dispatch}) => {
    sessionStorage.removeItem('authToken');
    localStorage.removeItem('userDetails');
    sessionStorage.removeItem('refreshToken');
    // Limpa outras informações de autenticação/sessão conforme necessário
    dispatch(logout()); // Chama a ação pura de logout para atualizar o estado
});

export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (refreshToken: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:8081/auth/refresh?refreshToken=${encodeURIComponent(refreshToken)}`, {
                method: 'POST',
                headers: {
                },
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

export const fetchUserDetails = createAsyncThunk(
    'auth/fetchUserDetails',
    async (_, {getState, dispatch, rejectWithValue}) => {
        const accessToken = (getState() as RootState).auth.token;
        try {
            const response = await fetch('http://localhost:8081/v1/usuarios/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Falha ao buscar detalhes do usuário');
            }

            const usuario: Usuario = await response.json();
            dispatch(setUserDetails({
                email: usuario.email,
                name: usuario.nome,
                id: usuario.id,
                roles: usuario.roles,
                image: usuario.avatarUrl
            }));
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Erro desconhecido ao buscar detalhes do usuário');
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
        login: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
            const userDetails = decodeJwt(action.payload.accessToken);
            state.isAuthenticated = true;
            state.token = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.userDetails = {
                email: userDetails.sub, // Ajuste com base na estrutura do seu token
                name: userDetails.nome, // Ajuste conforme necessário
                id: userDetails.userId,
                roles: userDetails.roles || [],
                image: userDetails.image || '',
            };
            sessionStorage.setItem('authToken', action.payload.accessToken);
            sessionStorage.setItem('refreshToken', action.payload.refreshToken);
            sessionStorage.setItem('userDetails', JSON.stringify(state.userDetails));

        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.refreshToken = null;
            state.userDetails = null;
            sessionStorage.removeItem('authToken');
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
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                // Não é necessário fazer nada aqui se o estado já foi atualizado pelo dispatch
            })
            .addCase(logoutAsync.fulfilled, (state) => {
                logoutAsync();
            })
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

                console.error('Falha ao atualizar o token:', action.payload);
            });
    },
});

export const { setUserDetails, setAuthenticated, login, logout, setToken, setFetching} = authSlice.actions;

export const selectIsAuthenticated = (state: RootState): boolean => state.auth.isAuthenticated;
export const selectIsFetching = (state: RootState): boolean => state.auth.isFetching;
export const selectUserDetails = (state: RootState): UserDetails | null => state.auth.userDetails;