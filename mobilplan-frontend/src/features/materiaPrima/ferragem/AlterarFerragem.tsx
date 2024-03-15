import { Box, Paper, Typography } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import FerragemForm from "../../../components/MateriaPrima/Ferragem/FerragemForm";
import { Ferragem, alterarFerragem, selectFerragemId } from "./ferragemSlice";
import {useSnackbar} from "notistack";

export const AlterarFerragem = () => {
  const id = Number(useParams<{ id: string }>().id || 0);
  const ferragem = useAppSelector((state) => selectFerragemId(state, id));
  const [isDisabled, setIsDisabled] = useState(false);
  const [ferragemState, setFerragemState] = useState<Ferragem>(
    ferragem || ({} as Ferragem)
  );
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    dispatch(alterarFerragem(ferragemState));
    enqueueSnackbar("Ferragem alterada com sucesso!", { variant: "success" });
  }

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
        Editar Ferragem
      </Typography>
      <Paper>
        <FerragemForm
          ferragem={ferragemState}
          isDisabled={isDisabled}
          onSubmit={handleSubmit}
          handleChange={handleChange}
          handleSelect={handleSelect}
        />
      </Paper>
    </Box>
  );
};
