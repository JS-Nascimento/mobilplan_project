import {
    Box,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import {ChangeEvent, useEffect, useState} from "react";
import {Ferragem} from "../../../features/materiaPrima/ferragem/ferragemSlice";
import {AtualizadoEmLabel, CriadoEmLabel,} from "../../DateAuditLabel/DateAuditLabel";
import {LabelIDNumber} from "../../NumberIDLabel";
import BotaoPrimario from "../../CustomButtons/BotaoPrimario";
import BotaoSecundario from "../../CustomButtons/BotaoSecundario";
import {useNavigate} from "react-router-dom";

type Props = {
    ferragem: Ferragem;
    isDisabled?: boolean;
    isLoading?: boolean;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSelect: (e: SelectChangeEvent) => void;
    validateErrors: any;
};

// Definição das opções do select
const opcoesUnidades = [
    {valor: "METRO_QUADRADO", rotulo: "M²"},
    {valor: "METRO_LINEAR", rotulo: "M/l"},
    {valor: "UNIDADE", rotulo: "Unidade"},
    {valor: "PAR", rotulo: "Par"},
    {valor: "JOGO", rotulo: "Jogo"},
    {valor: "PACOTE", rotulo: "Pacote"},
    {valor: "PECA", rotulo: "Peça"},
];

const opcoesPrecificacao = [
    {valor: "M2", rotulo: "M²"},
    {valor: "ML", rotulo: "M/l"},
    {valor: "UNIDADE", rotulo: "Unidade"},
];

export default function FerragemForm({
                                         ferragem,
                                         isDisabled,
                                         isLoading,
                                         onSubmit,
                                         handleChange,
                                         handleSelect,
                                         validateErrors,
                                     }: Props) {
    const navigate = useNavigate();
    const [precoInput, setPrecoInput] = useState(ferragem.preco.toString());

    const [errors, setErrors] = useState({
        descricao: '',
        cor: '',
        unidade: '',
        preco: '',
        precificacao: '',
    });

    useEffect(() => {
        if (validateErrors) {
            setErrors(validateErrors);
        }
    }, [validateErrors]); // Dependência para `validateErrors`

    // Restante do componente permanece igual

    const handlePrecoChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPrecoInput(event.target.value);
        handleChange(event);
    };

    const handlePrecoBlur = () => {
        const precoFormatado = parseFloat(precoInput).toFixed(2); // Exemplo de formatação
        setPrecoInput(precoFormatado);
    };
    return (
        <Box p={2}>
            <form onSubmit={onSubmit}>
                <Grid container spacing={3}>
                    {ferragem.id && (
                        <Grid item xs={12}>
                            <LabelIDNumber data={ferragem.id.toString()}/>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                name="descricao"
                                label="Descrição"
                                value={ferragem.descricao}
                                onChange={handleChange}
                                error={!!errors.descricao}
                                helperText={errors.descricao}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                name="cor"
                                label="Cor"
                                value={ferragem.cor}
                                onChange={handleChange}
                                error={!!errors.cor}
                                helperText={errors.cor}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="label-unidade">Unidade</InputLabel>
                            <Select
                                id="select-unidade"
                                name="unidade"
                                value={ferragem.unidade}
                                label="Unidade"
                                labelId="label-unidade"
                                onChange={handleSelect}
                            >
                                {opcoesUnidades.map((opcao) => (
                                    <MenuItem key={opcao.valor} value={opcao.valor}>
                                        {opcao.rotulo}
                                    </MenuItem>
                                ))}
                            </Select>
                            {!!errors.unidade && <FormHelperText>{errors.unidade}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                variant="outlined"
                                type="number"
                                name="preco"
                                label="Preço"
                                value={ferragem.preco.toString()}
                                onChange={handleChange}
                                error={!!errors.preco}
                                helperText={errors.preco}
                                InputProps={{
                                    startAdornment: "R$",
                                    inputProps: {
                                        min: 0, // Valor mínimo
                                        step: 0.01, // Passo para a mudança de valor
                                    },
                                }}
                                // Quando o campo perde o foco, formata o número para o formato de moeda
                                onBlur={handlePrecoBlur}
                                //Quando o campo é focado, remove a formatação para edição
                                //onFocus={handlePrecoChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="label-precificacao">Precificação</InputLabel>
                            <Select
                                id="select-precificacao"
                                name="precificacao"
                                value={ferragem.precificacao}
                                label="Precificação"
                                labelId="label-precificacao"
                                onChange={handleSelect}
                            >
                                {opcoesPrecificacao.map((opcao) => (
                                    <MenuItem key={opcao.valor} value={opcao.valor}>
                                        {opcao.rotulo}
                                    </MenuItem>
                                ))}
                            </Select>
                            {!!errors.unidade && <FormHelperText>{errors.precificacao}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} display="row">
                        <Box
                            display="flex"
                            justifyContent={{xs: "center", sm: "flex-end"}}
                        >
                            <CriadoEmLabel data={ferragem?.criadoEm || ""}/>
                            <Box ml={4}></Box>
                            <AtualizadoEmLabel data={ferragem?.atualizadoEm || ""}/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} display="row">
                        <Box
                            display="flex"
                            justifyContent={{xs: "center", sm: "flex-start"}}
                        >
                            <BotaoSecundario largura={200} onClick={() => navigate('/ferragem')} disabled={isDisabled}>
                                Voltar
                            </BotaoSecundario>
                            <Box ml={1}></Box>
                            <BotaoPrimario
                                type="submit"
                                disabled={isDisabled}
                                sx={{width: 200}}
                            >Salvar</BotaoPrimario>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}
