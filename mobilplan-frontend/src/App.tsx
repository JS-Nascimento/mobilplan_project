import React, {useEffect} from 'react';
import {ThemeProvider} from '@mui/material/styles';
import {Route, Routes} from 'react-router-dom';
import {Box} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {Header} from './components/Header';
import {Layout} from './components/Layout';
import {appTheme} from './config/theme';
import LoginPage from "./components/Login/LoginPage";
import HomePage from "./components/Home/HomePage";
import {SnackbarProvider} from "notistack";
import {ListarFerragem} from "./features/materiaPrima/ferragem/ListarFerragem";
import {CriarFerragem} from "./features/materiaPrima/ferragem/CriarFerragem";
import {AlterarFerragem} from "./features/materiaPrima/ferragem/AlterarFerragem";
import {selectIsAuthenticated, setAuthenticated, setToken, setUserDetails} from "./features/auth/authSlice";
import {ImportarLote} from "./features/materiaPrima/ferragem/ImportarLote";
import EditarConfiguracoesComAbas from "./features/configuracoes/EditarConfiguracoesComAbas";


function App() {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedToken = sessionStorage.getItem('authToken');
        const storedRefreshToken = sessionStorage.getItem('refreshToken');
        const storedUserDetails = sessionStorage.getItem('userDetails');
        if (storedToken && storedUserDetails && storedRefreshToken) {
            // Apenas se todos os dados necessários estiverem presentes, marque como autenticado
            const userDetails = JSON.parse(storedUserDetails);
            dispatch(setAuthenticated(true));
            dispatch(setToken({accessToken: storedToken, refreshToken: storedRefreshToken}));
            dispatch(setUserDetails(userDetails));
        } else {
            // Se algum dos dados não estiver presente, não marque como autenticado
            dispatch(setAuthenticated(false));
        }
    }, [dispatch]);


    return (
        <ThemeProvider theme={appTheme}>
            <SnackbarProvider maxSnack={3} anchorOrigin={{vertical: 'top', horizontal: 'right',}}
                              autoHideDuration={3000}>
                <Box component="main" sx={{height: "100vh", backgroundColor: (theme) => theme.palette.grey[100]}}>
                    {isAuthenticated ? (
                        <>
                            <Header/>
                            <Layout>
                                <Routes>
                                    <Route path="/" element={<HomePage/>}/>
                                    <Route path="/ferragem" element={<ListarFerragem/>}/>
                                    <Route path="/ferragem/criar" element={<CriarFerragem/>}/>
                                    <Route path="/ferragem/:id" element={<AlterarFerragem/>}/>
                                    <Route path="/ferragem/importar" element={<ImportarLote/>}/>
                                    <Route path="/settings" element={<EditarConfiguracoesComAbas/>}/>
                                    {/* Defina outras rotas autenticadas aqui */}
                                </Routes>
                            </Layout>
                        </>
                    ) : (
                        <Routes>
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path="*" element={
                                <LoginPage/>}/> {/* Redireciona todas as outras rotas para o login se não estiver autenticado */}
                        </Routes>
                    )}
                </Box>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
