import { useNavigate } from "react-router-dom";
import {Box, Paper, SelectChangeEvent, Typography} from "@mui/material";
import {ChangeEvent, useEffect, useState} from "react";
import FerragemForm from "../../../components/MateriaPrima/Ferragem/FerragemForm";
import {Ferragem, initialState, useCreateFerragemMutation} from "./ferragemSlice";
import {useSnackbar} from "notistack";

export const CriarFerragem = () => {
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const [createFerragem, status] = useCreateFerragemMutation();
    const [isDisabled, setIsDisabled] = useState(false);
    const [ferragem, setFerragem] = useState<Ferragem>(
        initialState || ({} as Ferragem)
    );

    const [ferragemState, setFerragemState] = useState<Ferragem>(
        ferragem || ({} as Ferragem)
    );
    const [selectedFile, setSelectedFile] = useState<SelectedFile>({name: null, file: null});

    type SelectedFile = {
        name: string | null;
        file: File | null;
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>, selectedName: string | null, selectedFile: File | null) {
        event.preventDefault();
        createFerragem(ferragemState);
    }

    const handleChange = (
        event: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
        >
    ) => {
        const {name, value} = event.target as { name: string; value: any };
        setFerragemState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSelect = (event: SelectChangeEvent) => {
        const {name, value} = event.target;

        setFerragemState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        // Exemplo de validação para o campo 'descricao'
        if (!ferragemState.descricao) {
            isValid = false;
            tempErrors = { ...tempErrors, descricao: "Descrição é obrigatória." };
        }
        if (!ferragemState.cor) {
            isValid = false;
            tempErrors = { ...tempErrors, cor: "Cor é obrigatória." };
        }
        if (ferragemState.preco <= 0) {
            isValid = false;
            tempErrors = { ...tempErrors, preco: "Preço precisa ser maior que 0,00." };
        }
        if (!ferragemState.unidade) {
            isValid = false;
            tempErrors = { ...tempErrors, unidade: "Unidade é obrigatória." };
        }
        if (!ferragemState.precificacao) {
            isValid = false;
            tempErrors = { ...tempErrors, precificacao: "Precificação é obrigatória." };
        }

        setErrors(tempErrors);
        return isValid;
    };


    useEffect(() => {
        if (status.isSuccess) {
            enqueueSnackbar("Ferragem criada com sucesso!", {variant: "success"});
            setIsDisabled(true);
            navigate('/ferragem');
        }
        if (status.isError) {
            enqueueSnackbar("Erro ao criar ferragem", {variant: "error"});
        }
    }, [enqueueSnackbar, status.isError, status.isSuccess]);

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
                    onSubmit={({event, selectedFile}) => {
                        setSelectedFile(selectedFile);
                        handleSubmit(event, selectedFile.name, selectedFile.file);
                    }}
                    handleChange={handleChange}
                    handleSelect={handleSelect}
                    validateErrors={errors}
                />
            </Paper>
        </Box>
    );
};
