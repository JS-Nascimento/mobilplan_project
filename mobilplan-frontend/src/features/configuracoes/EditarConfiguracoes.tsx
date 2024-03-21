import React, { useState } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormGroup,
    FormControlLabel,
    Switch,
    Tooltip,
    IconButton,
    Container, SelectChangeEvent, ImageListItem,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {opcoesTipoMontagemFundo} from "./TipoMontagemFundo";

// Definindo a interface para o estado do formulário
interface FormState {
    tipoMontagemFundo: string;
    espessuraFundoGaveta: number;
    acompanhaTrilhoGaveta: boolean;
    // Adicione mais campos conforme necessário
}

const FormularioEdicao = () => {
    const [formState, setFormState] = useState<FormState>({
        tipoMontagemFundo: '',
        espessuraFundoGaveta: 0,
        acompanhaTrilhoGaveta: false,
        // Inicialize mais campos conforme necessário
    });

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }> | SelectChangeEvent) => {
        const name = event.target.name as keyof typeof formState;
        const value = event.target.value;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const [name , imageSrc] = opcoesTipoMontagemFundo;

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>
                Configurações de Fabricação
            </Typography>
            <Paper elevation={3} sx={{ p: 2, overflow: 'auto', maxHeight: 720 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>

                        <FormControl fullWidth>
                            <InputLabel>Tipo de Montagem do Fundo</InputLabel>
                            <Select
                                name="tipoMontagemFundo"
                                value={formState.tipoMontagemFundo}
                                onChange={handleChange}
                                label="Tipo de Montagem do Fundo"
                            >
                                {opcoesTipoMontagemFundo.map((opcao) => (
                                    <MenuItem key={opcao.name} value={opcao.name}>
                                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                            {opcao.name}
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center' }}>
                        <Tooltip title="Informações sobre Espessura do Fundo da Gaveta">
                            <IconButton>
                                <HelpOutlineIcon />
                            </IconButton>
                        </Tooltip>
                        <TextField
                            fullWidth
                            type="number"
                            label="Espessura do Fundo da Gaveta"
                            name="espessuraFundoGaveta"
                            value={formState.espessuraFundoGaveta}
                            onChange={handleChange}
                        />
                    </Grid>

                    {/* Adicione mais campos aqui seguindo o padrão acima */}

                    <Grid item xs={12}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formState.acompanhaTrilhoGaveta}
                                        onChange={e => setFormState({ ...formState, acompanhaTrilhoGaveta: e.target.checked })}
                                        name="acompanhaTrilhoGaveta"
                                    />
                                }
                                label="Acompanha Trilho da Gaveta"
                            />
                        </FormGroup>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default FormularioEdicao;
