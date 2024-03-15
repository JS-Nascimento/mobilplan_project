import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Ferragem } from "../../../features/materiaPrima/ferragem/ferragemSlice";
import {
  AtualizadoEmLabel,
  CriadoEmLabel,
} from "../../DateAuditLabel/DateAuditLabel";
import { LabelIDNumber } from "../../NumberIDLabel";
import BotaoPrimario from "../../CustomButtons/BotaoPrimario";
import BotaoSecundario from "../../CustomButtons/BotaoSecundario";
import { useNavigate } from "react-router-dom";

type Props = {
  ferragem: Ferragem;
  isDisabled?: boolean;
  isLoading?: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>)=>void;
  handleChange: (e: ChangeEvent<HTMLInputElement>)=>void;
  handleSelect: (e: SelectChangeEvent)=>void;
};

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

export default function FerragemForm({
  ferragem,
  isDisabled,
  isLoading,
  onSubmit,
  handleChange,
  handleSelect,
}: Props) {
  const navigate = useNavigate();
  const [precoInput, setPrecoInput] = useState(ferragem.preco.toString());

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
          <Grid item xs={12}>
            <LabelIDNumber data={ferragem.id.toString()} />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                name="descricao"
                label="Descrição"
                value={ferragem.descricao}
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
                value={ferragem.cor}
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
                value={ferragem.preco}
                onChange={handleChange}
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
            </FormControl>
          </Grid>
          <Grid item xs={12} display="row">
            <Box
              display="flex"
              justifyContent={{ xs: "center", sm: "flex-end" }}
            >
              <CriadoEmLabel data={ferragem?.criadoEm || ""} />
              <Box ml={4}></Box>
              <AtualizadoEmLabel data={ferragem?.atualizadoEm || ""} />
            </Box>
          </Grid>
          <Grid item xs={12} display="row">
            <Box
              display="flex"
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              <BotaoSecundario onClick={() => navigate(-1)}>
                Voltar
              </BotaoSecundario>
              <Box ml={1}></Box>
              <BotaoPrimario type="submit">Salvar</BotaoPrimario>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
