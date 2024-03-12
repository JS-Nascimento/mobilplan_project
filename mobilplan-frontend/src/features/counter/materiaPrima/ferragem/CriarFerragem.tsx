import { Box, Paper, SelectChangeEvent, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import FerragemForm from "../../../../components/MateriaPrima/Ferragem/FerragemForm";
import { Ferragem, criarFerragem } from "./ferragemSlice";

export const CriarFerragem = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [ferragem, setFerragem] = useState<Ferragem>({
    id: 0,
    descricao: "",
    cor: "",
    unidade: "",
    preco: 0.0,
    precificacao: "",
    imagem: "",
    criadoEm: "",
    atualizadoEm: "",
    tenantId: "",
  });

  const [ferragemState, setFerragemState] = useState<Ferragem>(
    ferragem || ({} as Ferragem)
  );

  const dispatch = useAppDispatch();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    dispatch(criarFerragem(ferragemState));
  };

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = event.target as { name: string; value: any };
    setFerragemState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelect = (event: SelectChangeEvent) => {
    const { name, value } = event.target;

    setFerragemState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
        Criar Ferragem
      </Typography>
      <Paper>
        <FerragemForm
          ferragem={ferragemState}
          isDisabled={isDisabled}
          onSubmit={handleSubmit} // Correto
          handleChange={handleChange}
          handleSelect={handleSelect}
        />
      </Paper>
    </Box>
  );
};
