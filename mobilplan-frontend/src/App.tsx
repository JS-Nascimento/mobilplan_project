import { ThemeProvider } from '@mui/system';
import { Routes, Route, Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { appTheme } from './config/theme';
import { ListarFerragem } from './features/counter/materiaPrima/ferragem/ListarFerragem';
import { CriarFerragem } from './features/counter/materiaPrima/ferragem/CriarFerragem';
import { AlterarFerragem } from './features/counter/materiaPrima/ferragem/AlterarFerragem';


function App() {
 return <ThemeProvider theme={appTheme}>
  <Box component="main" sx={{ height: "100vh",
       backgroundColor: (theme) => theme.palette.grey[100] }}>
    <Header/>
    <Layout>
      <Routes>
        <Route path="/" element={<ListarFerragem />} />
        <Route path="/ferragem" element={<ListarFerragem />} />
        <Route path="/ferragem/criar" element={<CriarFerragem />} />
        <Route path="/ferragem/editar/:id" element={<AlterarFerragem />} />

        <Route path="*" element={<Typography variant="h3" component="h1">404</Typography>} />
      </Routes>

    </Layout>
    </Box>
 </ThemeProvider>;
}

export default App;
