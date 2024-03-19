import React from 'react';
import {ThemeProvider} from '@mui/material/styles';
import {Route, Routes} from 'react-router-dom';
import {Box} from '@mui/material';
import {useSelector} from 'react-redux';
import {Header} from './components/Header';
import {Layout} from './components/Layout';
import {appTheme} from './config/theme';
import LoginPage from "./components/Login/LoginPage";
import HomePage from "./components/Home/HomePage";
import {SnackbarProvider} from "notistack";
import {ListarFerragem} from "./features/materiaPrima/ferragem/ListarFerragem";
import {CriarFerragem} from "./features/materiaPrima/ferragem/CriarFerragem";
import {AlterarFerragem} from "./features/materiaPrima/ferragem/AlterarFerragem";
import {selectIsAuthenticated} from "./features/auth/authSlice";


function App() {
    const isAuthenticated = useSelector(selectIsAuthenticated);

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
