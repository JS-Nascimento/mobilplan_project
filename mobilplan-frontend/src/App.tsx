import {ThemeProvider} from '@mui/material/styles';
import {Routes, Route} from 'react-router-dom';
import {Box, Typography} from '@mui/material';
import {Header} from './components/Header';
import {Layout} from './components/Layout';
import {appTheme} from './config/theme';
import {ListarFerragem} from './features/materiaPrima/ferragem/ListarFerragem';
import {CriarFerragem} from './features/materiaPrima/ferragem/CriarFerragem';
import {AlterarFerragem} from './features/materiaPrima/ferragem/AlterarFerragem';
import {SnackbarProvider} from "notistack";


function App() {
    return <ThemeProvider theme={appTheme}>
        <SnackbarProvider maxSnack={3}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            autoHideDuration={3000}
                            hideIconVariant={false}
                            dense={false}
                            preventDuplicate={true}
                            variant="error"
                            iconVariant={{
                                error: "✖️",
                                success: "✔️",
                                warning: "⚠️",
                                info: "ℹ️",
                            }}
        >
            <Box component="main" sx={{
                height: "100vh",
                backgroundColor: (theme) => theme.palette.grey[100]
            }}>
                <Header/>
                <Layout>
                    <Routes>
                        <Route path="/"/>
                        <Route path="/ferragem" element={<ListarFerragem/>}/>
                        <Route path="/ferragem/criar" element={<CriarFerragem/>}/>
                        <Route path="/ferragem/:id" element={<AlterarFerragem/>}/>

                        <Route path="*" element={<Typography variant="h3" component="h1">404</Typography>}/>
                    </Routes>

                </Layout>
            </Box>
        </SnackbarProvider>
    </ThemeProvider>;
}

export default App;
