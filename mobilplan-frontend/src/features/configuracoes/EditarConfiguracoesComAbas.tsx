import React, {ChangeEvent, useState} from 'react';
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
    Container,
    Tab,
    Tabs,
    SelectChangeEvent,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {opcoesTipoMontagemFundo} from "./TipoMontagemFundo";
import {CustomTooltipHelper} from "../../components/CustomTooltipHelper/TololtipHelper";
import CustomSwitch from "../../components/CustomSwitch";

interface FormState {
    tipoMontagemFundo: string;
    espessuraFundoGaveta: number;
    rebaixoFundoGaveta: number;
    folgaTrilhosGaveta: number;
    folgaProfunidadeGavetaEmRelacaoGabinete: number;
    acompanhaTrilhoGaveta: boolean;
    // Adicione mais campos conforme necessário
}

const FormularioEdicaoComAbas = () => {
    const [formState, setFormState] = useState<FormState>({
        tipoMontagemFundo: '',
        espessuraFundoGaveta: 0,
        rebaixoFundoGaveta: 0,
        folgaTrilhosGaveta: 0,
        folgaProfunidadeGavetaEmRelacaoGabinete: 0,
        acompanhaTrilhoGaveta: false,
        // Inicialize mais campos conforme necessário
    });
    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }> | SelectChangeEvent) => {
        const name = event.target.name as keyof typeof formState;
        const value = event.target.value;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.checked });
    };
    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <Container maxWidth="lg">
            <Typography
                sx={{

                    typography: {
                        xs: "h6",
                        sm: "h6",
                        md: "h5",
                        lg: "h5",
                    },
                }}
                gutterBottom>
                Configurações de Fabricação
            </Typography>
            <Paper elevation={3} sx={{p: 2, overflow: 'auto', height: 720, maxHeight: 720}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={activeTab} onChange={handleTabChange} aria-label="Configurações de fabricação">
                        <Tab label="Geral"/>
                        <Tab label="Gavetas"/>
                        <Tab label="Portas"/>
                        {/* Adicione mais abas conforme necessário */}
                    </Tabs>
                </Box>
                <Box p={3}>
                    {activeTab === 0 && (
                        // Conteúdo da aba "Geral"
                        <Grid container spacing={2}>
                            {/* Campos relacionados à configuração geral */}
                        </Grid>
                    )}
                    {activeTab === 1 && (
                        // Conteúdo da aba "Gavetas"
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center'}}>
                                <FormControl fullWidth>
                                    <InputLabel>Tipo de Montagem do Fundo</InputLabel>
                                    <Select
                                        name="tipoMontagemFundo"
                                        value={formState.tipoMontagemFundo}
                                        onChange={handleChange}
                                        label="Tipo de Montagem do Fundo ( MM )"
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
                                <CustomTooltipHelper
                                    title="Montagem do fundo da gaveta"
                                    imageSrc='/assets/configs/ambos-tipos.png'
                                />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center'}}>
                                <CustomTooltipHelper
                                    title="Espessura do Fundo da Gaveta"
                                    imageSrc='/assets/configs/espessura-fundo.png'
                                />
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Espessura do Fundo da Gaveta ( MM )"
                                    name="espessuraFundoGaveta"
                                    value={formState.espessuraFundoGaveta}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center'}}>

                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Profundidade do Rebaixo do Fundo da Gaveta ( MM )"
                                    name="rebaixoFundoGaveta"
                                    value={formState.rebaixoFundoGaveta}
                                    onChange={handleChange}
                                />
                                <CustomTooltipHelper
                                    title="Espessura do Fundo da Gaveta"
                                    imageSrc='/assets/configs/rebaixo-fundo.png'
                                />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center'}}>
                                <CustomTooltipHelper
                                    title="Espessura do Fundo da Gaveta"
                                    imageSrc='/assets/configs/folga-trilho.jpg'
                                />
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Folga referente ao Trilho da gaveta ( MM )"
                                    name="folgaTrilhosGaveta"
                                    value={formState.folgaTrilhosGaveta}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center'}}>

                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <CustomSwitch
                                                checked={formState.acompanhaTrilhoGaveta}
                                                onChange={handleSwitchChange}
                                                name="acompanhaTrilhoGaveta"
                                            />
                                        }
                                        label="Acompanha profundidade do Trilho ?"
                                    />
                                </FormGroup>
                                <CustomTooltipHelper
                                    title="Gaveta acompanha comprimento do trilho ?"
                                    imageSrc='/assets/configs/acompanha-trilho.png'
                                />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center'}}>
                                <CustomTooltipHelper
                                    title="Folga da Gaveta em relação ao Gabinete"
                                    imageSrc='/assets/configs/folgaProfundidadeEmRelacaoGabinete.png'
                                />
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Folga da Gaveta em relação ao Gabinete ( MM )"
                                    name="folgaProfunidadeGavetaEmRelacaoGabinete"
                                    value={formState.folgaProfunidadeGavetaEmRelacaoGabinete}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    )}
                    {activeTab === 2 && (
                        // Conteúdo da aba "Portas"
                        <Grid container spacing={2}>
                            {/* Campos relacionados à configuração de portas */}
                        </Grid>
                    )}
                    {/* Conteúdo das demais abas conforme necessário */}
                </Box>
            </Paper>
        </Container>
    );
};

export default FormularioEdicaoComAbas;
