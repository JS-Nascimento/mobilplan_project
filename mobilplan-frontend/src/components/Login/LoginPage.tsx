import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Box, Grid, IconButton, InputAdornment, Link, TextField, Typography} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import logoImage from '../../assets/logo2.png';
import BotaoPrimario from "../CustomButtons/BotaoPrimario";
import BotaoSecundario from "../CustomButtons/BotaoSecundario";
import {login as loginUser} from '../../features/auth/authService'; // Supondo que você tem isso implementado
import {fetchUserDetails, login} from '../../features/auth/authSlice';
import {useNavigate} from "react-router-dom"; // Ação Redux

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault(); // Previne o recarregamento da página
        setError(''); // Limpa erros anteriores
        try {
            const response = await loginUser({username: email, password});
            dispatch(login(response));
            navigate('/');
        } catch (err) {
            navigate('/login');
            setError('Falha no login. Por favor, verifique suas credenciais.');
        }
    };

    const handleToggleShowPassword = () => setShowPassword(!showPassword);

    return (
        <Box sx={{flexGrow: 1, backgroundColor: (theme) => theme.palette.grey[50]}}>
            <Grid container spacing={2} alignItems="center" justifyContent="center" style={{minHeight: '100vh'}}>
                <Grid item xs={10} sm={8} md={4} style={{display: 'flex', justifyContent: 'center'}}>
                    <img src={logoImage} alt="Logo"
                         style={{width: 300, maxWidth: '100%', height: 'auto', maxHeight: 400}}/>
                </Grid>
                <Grid item xs={10} sm={6} md={4}>
                    <Typography variant="h4" component="h1" marginBottom={2}>Login</Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    <form onSubmit={handleLogin}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Senha"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleToggleShowPassword}>
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{mb: 4}}
                        />
                        <BotaoPrimario fullWidth type="submit" sx={{mb: 4}}>Login</BotaoPrimario>
                        <BotaoSecundario fullWidth>Cadastre-se</BotaoSecundario>
                        <Typography align="center" marginTop={2}>
                            <Link href="#" underline="hover">Esqueceu a senha?</Link>
                        </Typography>
                    </form>
                </Grid>
            </Grid>
        </Box>
    );
}
