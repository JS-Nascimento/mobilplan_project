import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../../app/hooks";
import {
  AtualizadoEmLabel,
  CriadoEmLabel,
} from "../../../../components/DateAuditLabel/DateAuditLabel";
import { LabelIDNumber } from "../../../../components/NumberIDLabel";
import BotaoPrimario from "../../../../components/PrimaryButton/BotaoPrimario";
import BotaoSecundario from "../../../../components/PrimaryButton/BotaoSecundario";
import { selectFerragemId } from "./ferragemSlice";

// Definição das opções do select
const opcoesUnidades = [
  { valor: "METRO_QUADRADO", rotulo: "M²" },
  { valor: "METRO_LINEAR", rotulo: "M/l" },
  { valor: "UNIDADE", rotulo: "Unidade" },
  { valor: "PAR", rotulo: "Par" },
  { valor: "JOGO", rotulo: "Jogo" },
  { valor: "PACOTE", rotulo: "Pacote" },
  { valor: "PECA", rotulo: "Peça" },
];

const opcoesPrecificacao = [
  { valor: "M2", rotulo: "M²" },
  { valor: "ML", rotulo: "M/l" },
  { valor: "UNIDADE", rotulo: "Unidade" },
];

export const AlterarFerragem = () => {
  const id = Number(useParams<{ id: string }>().id || 0);
  const ferragem = useAppSelector((state) => selectFerragemId(state, id));
  // Inicializa os estados com valores vazios
  const [unidade, setUnidade] = useState("");
  const [descricao, setDescricao] = useState("");
  const [cor, setCor] = useState("");
  const [preco, setPreco] = useState(0.0);
  const [precificacao, setPrecificacao] = useState("");

  // Atualiza o estado quando a ferragem é carregada ou alterada
  useEffect(() => {
    if (ferragem) {
      setDescricao(ferragem.descricao || "");
      setCor(ferragem.cor || "");
      setUnidade(ferragem.unidade || "");
      setPreco(ferragem.preco || 0.0);
      setPrecificacao(ferragem.precificacao || "");
    }
  }, [ferragem]); // Dependências do useEffect

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "descricao") setDescricao(event.target.value);
    if (event.target.name === "cor") setCor(event.target.value);
    if (event.target.name === "preco") setPreco(parseFloat(event.target.value));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    if (event.target.name === "unidade")
      setUnidade(event.target.value as string);
    if (event.target.name === "precificacao")
      setPrecificacao(event.target.value as string);
  };

  return (
    <Box>
      <Typography
        mb={2}
        sx={{
          typography: {
            xs: "h6",
            sm: "h6",
            md: "h5",
            lg: "h5",
          },
        }}
      >
        Editar Ferragem
      </Typography>
      <Paper>
        <Box p={2}>
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <LabelIDNumber data={id.toString()} />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    required
                    name="descricao"
                    label="Descrição"
                    value={descricao}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    required
                    name="cor"
                    label="Cor"
                    value={cor}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="label-unidade">Unidade</InputLabel>
                  <Select
                    id="select-unidade"
                    name="unidade"
                    value={unidade}
                    label="Unidade"
                    labelId="label-unidade"
                    onChange={handleSelectChange}
                  >
                    {opcoesUnidades.map((opcao) => (
                      <MenuItem key={opcao.valor} value={opcao.valor}>
                        {opcao.rotulo}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    required
                    variant="outlined"
                    type="number"
                    name="preco"
                    label="Preço"
                    value={preco}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: "R$",
                      inputProps: {
                        min: 0, // Valor mínimo
                        step: 0.01, // Passo para a mudança de valor
                      },
                    }}
                    // Quando o campo perde o foco, formata o número para o formato de moeda
                    onBlur={() => setPreco(Number(preco))}
                    // Quando o campo é focado, remove a formatação para edição
                    onFocus={() => setPreco(preco)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="label-precificacao">Precificação</InputLabel>
                  <Select
                    id="select-precificacao"
                    name="precificacao"
                    value={precificacao}
                    label="Precificação"
                    labelId="label-precificacao"
                    onChange={handleSelectChange}
                  >
                    {opcoesPrecificacao.map((opcao) => (
                      <MenuItem key={opcao.valor} value={opcao.valor}>
                        {opcao.rotulo}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} display="row">
                <Box display="flex"  justifyContent={{ xs: 'center', sm: 'flex-end' }}>
                  <CriadoEmLabel data={ferragem?.criadoEm || ""} />
                  <Box ml={4}></Box>
                  <AtualizadoEmLabel data={ferragem?.atualizadoEm || ""} />
                </Box>
              </Grid>
              <Grid item xs={12} display="row">
              <Box display="flex" justifyContent={{ xs: 'center', sm: 'flex-start' }}>
              <BotaoSecundario onClick={() => console.log("Clicado")}>
                  Voltar
                </BotaoSecundario>
                <Box ml={1}></Box>
                <BotaoPrimario onClick={() => console.log("Clicado")}>
                  Salvar
                </BotaoPrimario>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};
