import React, {ChangeEvent, useState} from 'react';
import {
    Box,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material';
import {opcoesTipoMontagemFundo} from "./TipoMontagemFundo";
import {opcoesPadraoDeFitagem} from "./PadraoDeFitagem";
import {CustomTooltipHelper} from "../../components/CustomTooltipHelper/TololtipHelper";
import CustomSwitch from "../../components/CustomSwitch";
import {ConfiguracaoFabricacao} from "../../types/configuracao-fabricacao";
import {AtualizadoEmLabel, CriadoEmLabel} from "../../components/DateAuditLabel/DateAuditLabel";
import BotaoSecundario from "../../components/CustomButtons/BotaoSecundario";
import BotaoPrimario from "../../components/CustomButtons/BotaoPrimario";

const FormularioEdicaoComAbas: React.FC = () => {
    const [formState, setFormState] = useState<ConfiguracaoFabricacao>({
        id: 0,
        descricao: '',
        tipoMontagemFundo: '',
        espessuraFundoGaveta: 0,
        rebaixoFundoGaveta: 0,
        folgaTrilhosGaveta: 0,
        acompanhaTrilhoGaveta: false,
        folgaProfunidadeGavetaEmRelacaoGabinete: 0,
        corpoEmRelacaoFrenteGaveta: 0,
        espessuraCorpoGaveta: 0,
        folgaSuperiorPortaGiro: 0,
        folgaInferiorPortaGiro: 0,
        folgaEsquerdaPortaGiro: 0,
        folgaDireitaPortaGiro: 0,
        entreComponentesPortaGiro: 0,
        basePadraoFitagem: '',
        lateralPadraoFitagem: '',
        travessaHorizontalPadraoFitagem: '',
        travessaVerticalPadraoFitagem: '',
        fundoPadraoFitagem: '',
        prateleiraInternaPadraoFitagem: '',
        prateleiraExternaPadraoFitagem: '',
        tampoPadraoFitagem: '',
        portaPadraoFitagem: '',
        frenteGavetaPadraoFitagem: '',
        criadoEm: '',
        alteradoEm: '',
        tenantId: '',
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
        setFormState({...formState, [e.target.name]: e.target.checked});
    };
    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <Container maxWidth="lg">
            <Typography sx={{typography: {xs: "h6", sm: "h6", md: "h5", lg: "h5"}}} gutterBottom>
                Configurações de Fabricação
            </Typography>
            <Paper elevation={3} sx={{p: 2, overflow: 'auto', height: 720, maxHeight: 720, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={activeTab} onChange={handleTabChange} aria-label="Configurações de fabricação">
                        <Tab label="Geral"/>
                        <Tab label="Gavetas"/>
                        <Tab label="Portas"/>
                        {/* Adicione mais abas conforme necessário */}
                    </Tabs>
                </Box>
                <Box p={3} sx={{flexGrow: 1, overflow: 'auto'}}>
                    {activeTab === 0 && (
                        // Conteúdo da aba "Geral"
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center'}}>
                                <FormControl fullWidth>
                                    <InputLabel>Acabamento de Fita na Base</InputLabel>
                                    <Select
                                        name="basePadraoFitagem"
                                        value={formState.basePadraoFitagem}
                                        onChange={handleChange}
                                        label="Acabamento de Fita na Base"
                                    >
                                        {opcoesPadraoDeFitagem.map((opcao) => (
                                            <MenuItem key={opcao.value} value={opcao.name}>
                                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                    {opcao.name}
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <CustomTooltipHelper
                                    title="Padrão de Acabamento de Fita na Base do Gabinete"
                                    imageSrc='/assets/configs/ambos-tipos.png'
                                />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center'}}>
                                <FormControl fullWidth>
                                    <InputLabel>Acabamento de Fita na Lateral</InputLabel>
                                    <Select
                                        name="lateralPadraoFitagem"
                                        value={formState.lateralPadraoFitagem}
                                        onChange={handleChange}
                                        label="Acabamento de Fita na Lateral"
                                    >
                                        {opcoesPadraoDeFitagem.map((opcao) => (
                                            <MenuItem key={opcao.value} value={opcao.name}>
                                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                    {opcao.name}
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <CustomTooltipHelper
                                    title="Padrão de Acabamento de Fita na Lateral do Gabinete"
                                    imageSrc='/assets/configs/ambos-tipos.png'
                                />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center'}}>
                                <FormControl fullWidth>
                                    <InputLabel>Acabamento de Fita na Travessa Horizontal</InputLabel>
                                    <Select
                                        name="travessaHorizontalPadraoFitagem"
                                        value={formState.travessaHorizontalPadraoFitagem}
                                        onChange={handleChange}
                                        label="Acabamento de Fita na Travessa Horizontal"
                                    >
                                        {opcoesPadraoDeFitagem.map((opcao) => (
                                            <MenuItem key={opcao.value} value={opcao.name}>
                                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                    {opcao.name}
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <CustomTooltipHelper
                                    title="Padrão de Acabamento de Fita na Travessa Horizontal do Gabinete"
                                    imageSrc='/assets/configs/ambos-tipos.png'
                                />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center'}}>
                                <FormControl fullWidth>
                                    <InputLabel>Acabamento de Fita na Travessa Vertical</InputLabel>
                                    <Select
                                        name="travessaVerticalPadraoFitagem"
                                        value={formState.travessaVerticalPadraoFitagem}
                                        onChange={handleChange}
                                        label="Acabamento de Fita na Travessa Vertical"
                                    >
                                        {opcoesPadraoDeFitagem.map((opcao) => (
                                            <MenuItem key={opcao.value} value={opcao.name}>
                                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                    {opcao.name}
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <CustomTooltipHelper
                                    title="Padrão de Acabamento de Fita na Travessa Vertical do Gabinete"
                                    imageSrc='/assets/configs/ambos-tipos.png'
                                />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center'}}>
                                <FormControl fullWidth>
                                    <InputLabel>Acabamento de Fita no Fundo</InputLabel>
                                    <Select
                                        name="fundoPadraoFitagem"
                                        value={formState.fundoPadraoFitagem}
                                        onChange={handleChange}
                                        label="Acabamento de Fita no Fundo"
                                    >
                                        {opcoesPadraoDeFitagem.map((opcao) => (
                                            <MenuItem key={opcao.value} value={opcao.name}>
                                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                    {opcao.name}
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <CustomTooltipHelper
                                    title="Padrão de Acabamento de Fita no Fundo do Gabinete"
                                    imageSrc='/assets/configs/ambos-tipos.png'
                                />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center'}}>
                                <FormControl fullWidth>
                                    <InputLabel>Acabamento de Fita na Prateleira Interna</InputLabel>
                                    <Select
                                        name="prateleiraInternaPadraoFitagem"
                                        value={formState.prateleiraInternaPadraoFitagem}
                                        onChange={handleChange}
                                        label="Acabamento de Fita na Prateleira Interna"
                                    >
                                        {opcoesPadraoDeFitagem.map((opcao) => (
                                            <MenuItem key={opcao.value} value={opcao.name}>
                                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                    {opcao.name}
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <CustomTooltipHelper
                                    title="Padrão de Acabamento de Fita na Prateleira Interna do Gabinete"
                                    imageSrc='/assets/configs/ambos-tipos.png'
                                />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center'}}>
                                <FormControl fullWidth>
                                    <InputLabel>Acabamento de Fita na Prateleira Externa</InputLabel>
                                    <Select
                                        name="prateleiraExternaPadraoFitagem"
                                        value={formState.prateleiraExternaPadraoFitagem}
                                        onChange={handleChange}
                                        label="Acabamento de Fita na Prateleira Externa"
                                    >
                                        {opcoesPadraoDeFitagem.map((opcao) => (
                                            <MenuItem key={opcao.value} value={opcao.name}>
                                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                    {opcao.name}
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <CustomTooltipHelper
                                    title="Padrão de Acabamento de Fita na Prateleira Externa"
                                    imageSrc='/assets/configs/ambos-tipos.png'
                                />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center'}}>
                                <FormControl fullWidth>
                                    <InputLabel>Acabamento de Fita em Tampos</InputLabel>
                                    <Select
                                        name="tampoPadraoFitagem"
                                        value={formState.tampoPadraoFitagem}
                                        onChange={handleChange}
                                        label="Acabamento de Fita em Tampos"
                                    >
                                        {opcoesPadraoDeFitagem.map((opcao) => (
                                            <MenuItem key={opcao.value} value={opcao.name}>
                                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                    {opcao.name}
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <CustomTooltipHelper
                                    title="Padrão de Acabamento de Fita em Tampos diversos"
                                    imageSrc='/assets/configs/ambos-tipos.png'
                                />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center'}}>
                                <FormControl fullWidth>
                                    <InputLabel>Acabamento de Fita em Portas</InputLabel>
                                    <Select
                                        name="portaPadraoFitagem"
                                        value={formState.portaPadraoFitagem}
                                        onChange={handleChange}
                                        label="Acabamento de Fita em Portas"
                                    >
                                        {opcoesPadraoDeFitagem.map((opcao) => (
                                            <MenuItem key={opcao.value} value={opcao.name}>
                                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                    {opcao.name}
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <CustomTooltipHelper
                                    title="Padrão de Acabamento de Fita em Portas"
                                    imageSrc='/assets/configs/ambos-tipos.png'
                                />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center'}}>
                                <FormControl fullWidth>
                                    <InputLabel>Acabamento de Fita em Frentes de Gaveta</InputLabel>
                                    <Select
                                        name="frenteGavetaPadraoFitagem"
                                        value={formState.frenteGavetaPadraoFitagem}
                                        onChange={handleChange}
                                        label="Acabamento de Fita em Frentes de Gaveta"
                                    >
                                        {opcoesPadraoDeFitagem.map((opcao) => (
                                            <MenuItem key={opcao.value} value={opcao.name}>
                                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                    {opcao.name}
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <CustomTooltipHelper
                                    title="Padrão de Acabamento de Fita em Frentes de Gaveta"
                                    imageSrc='/assets/configs/ambos-tipos.png'
                                />
                            </Grid>
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

                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Espessura do Fundo da Gaveta ( MM )"
                                    name="espessuraFundoGaveta"
                                    value={formState.espessuraFundoGaveta}
                                    InputProps={{
                                        inputProps: {
                                            min: 0,
                                            step: 1,
                                        },
                                    }}
                                    onChange={handleChange}
                                />
                                <CustomTooltipHelper
                                    title="Espessura do Fundo da Gaveta"
                                    imageSrc='/assets/configs/espessura-fundo.png'
                                />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center'}}>

                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Profundidade do Rebaixo do Fundo da Gaveta ( MM )"
                                    name="rebaixoFundoGaveta"
                                    value={formState.rebaixoFundoGaveta}
                                    InputProps={{
                                        inputProps: {
                                            min: 0,
                                            step: 1,
                                        },
                                    }}
                                    onChange={handleChange}
                                />
                                <CustomTooltipHelper
                                    title="Espessura do Fundo da Gaveta"
                                    imageSrc='/assets/configs/rebaixo-fundo.png'
                                />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center'}}>

                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Folga referente ao Trilho da gaveta ( MM )"
                                    name="folgaTrilhosGaveta"
                                    value={formState.folgaTrilhosGaveta}
                                    InputProps={{
                                        inputProps: {
                                            min: 0,
                                            step: 1,
                                        },
                                    }}
                                    onChange={handleChange}
                                />
                                <CustomTooltipHelper
                                    title="Espessura do Fundo da Gaveta"
                                    imageSrc='/assets/configs/folga-trilho.jpg'
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
                                        label="Gaveta acompanha comprimento do trilho ?"
                                    />
                                </FormGroup>
                                <CustomTooltipHelper
                                    title="Gaveta acompanha comprimento do trilho ?"
                                    imageSrc='/assets/configs/acompanha-trilho.png'
                                />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center'}}>

                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Folga da profundidade da Gaveta em relação ao Gabinete ( MM )"
                                    name="folgaProfunidadeGavetaEmRelacaoGabinete"
                                    value={formState.folgaProfunidadeGavetaEmRelacaoGabinete}
                                    InputProps={{
                                        inputProps: {
                                            min: 0,
                                            step: 1,
                                        },
                                    }}
                                    onChange={handleChange}
                                />
                                <CustomTooltipHelper
                                    title="Folga da profundidade da Gaveta em relação ao Gabinete"
                                    imageSrc='/assets/configs/folgaProfundidadeEmRelacaoGabinete.png'
                                />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center'}}>

                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Folga entre a altura do Corpo da Gaveta e a Frente da Gaveta ( MM )"
                                    name="corpoEmRelacaoFrenteGaveta"
                                    value={formState.corpoEmRelacaoFrenteGaveta}
                                    InputProps={{
                                        inputProps: {
                                            min: 0,
                                            step: 1,
                                        },
                                    }}
                                    onChange={handleChange}
                                />
                                <CustomTooltipHelper
                                    title="Folga entre a altura do Corpo da Gaveta e a Frente da Gaveta"
                                    imageSrc='/assets/configs/Frente-ContraFrente.jpg'
                                />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center'}}>


                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Espessura da Chapa para Corpo da Gaveta ( MM )"
                                    name="espessuraCorpoGaveta"
                                    value={formState.espessuraCorpoGaveta}
                                    InputProps={{
                                        inputProps: {
                                            min: 0,
                                            step: 1,
                                        },
                                    }}
                                    onChange={handleChange}
                                />
                                <CustomTooltipHelper
                                    title="Espessura da Chapa para Corpo da Gaveta"
                                    imageSrc='/assets/configs/Frente-ContraFrente.jpg'
                                />
                            </Grid>
                        </Grid>
                    )}
                    {activeTab === 2 && (
                        // Conteúdo da aba "Portas"
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center'}}>

                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Folga superior da porta em relação ao Gabinete ( MM )"
                                    name="folgaSuperiorPortaGiro"
                                    value={formState.folgaSuperiorPortaGiro}
                                    InputProps={{
                                        inputProps: {
                                            min: 0,
                                            step: 1,
                                        },
                                    }}
                                    onChange={handleChange}
                                />
                                <CustomTooltipHelper
                                    title="Folga superior da porta em relação ao Gabinete"
                                    imageSrc='/assets/configs/folga-superior.png'
                                />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center'}}>

                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Folga inferior da porta em relação ao Gabinete ( MM )"
                                    name="folgaInferiorPortaGiro"
                                    value={formState.folgaInferiorPortaGiro}
                                    InputProps={{
                                        inputProps: {
                                            min: 0,
                                            step: 1,
                                        },
                                    }}
                                    onChange={handleChange}
                                />
                                <CustomTooltipHelper
                                    title="Folga inferior da porta em relação ao Gabinete"
                                    imageSrc='/assets/configs/folga-inferior.png'
                                />

                            </Grid>
                            <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center'}}>

                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Folga esquerda da porta em relação ao Gabinete ( MM )"
                                    name="folgaEsquerdaPortaGiro"
                                    value={formState.folgaEsquerdaPortaGiro}
                                    InputProps={{
                                        inputProps: {
                                            min: 0,
                                            step: 1,
                                        },
                                    }}
                                    onChange={handleChange}
                                />
                                <CustomTooltipHelper
                                    title="Folga esquerda da porta em relação ao Gabinete"
                                    imageSrc='/assets/configs/folga-lateral.png'
                                />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center'}}>

                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Folga direita da porta em relação ao Gabinete ( MM )"
                                    name="folgaDireitaPortaGiro"
                                    value={formState.folgaDireitaPortaGiro}
                                    InputProps={{
                                        inputProps: {
                                            min: 0,
                                            step: 1,
                                        },
                                    }}
                                    onChange={handleChange}
                                />
                                <CustomTooltipHelper
                                    title="Folga direita da porta em relação ao Gabinete"
                                    imageSrc='/assets/configs/folga-lateral.png'
                                />

                            </Grid>
                            <Grid item xs={12} md={6} sx={{display: 'flex', alignItems: 'center'}}>

                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Folga entre portas ( MM )"
                                    name="entreComponentesPortaGiro"
                                    value={formState.entreComponentesPortaGiro}
                                    InputProps={{
                                        inputProps: {
                                            min: 0,
                                            step: 1,
                                        },
                                    }}
                                    onChange={handleChange}
                                />
                                <CustomTooltipHelper
                                    title="Folga em portas de giro entre componentes"
                                    imageSrc='/assets/configs/folga-entre-componentes.png'
                                />
                            </Grid>

                        </Grid>
                    )}
                </Box>
                <Box sx={{mt: 'auto'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} display="flex" justifyContent="flex-end">
                            <CriadoEmLabel data={formState?.criadoEm || ""}/>
                            <Box ml={4}></Box>
                            <AtualizadoEmLabel data={formState?.alteradoEm || ""}/>
                        </Grid>
                        <Grid item xs={12} display="flex" justifyContent="flex-start">
                            <BotaoSecundario largura={200} onClick={() => console.log('cliquei aqui')}>
                                Voltar
                            </BotaoSecundario>
                            <Box ml={1}></Box>
                            <BotaoPrimario type="submit" disabled={false} sx={{width: 200}}>
                                Salvar
                            </BotaoPrimario>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
};

export default FormularioEdicaoComAbas;
