import {useNavigate} from "react-router-dom";
import {Box, Paper, SelectChangeEvent, Typography} from "@mui/material";
import React, {ChangeEvent, useState} from "react";
import FerragemForm from "../../../components/MateriaPrima/Ferragem/FerragemForm";
import {Ferragem, initialState, useCreateFerragemMutation} from "./ferragemSlice";
import {useSnackbar} from "notistack";
import {useHandleImageUpload} from "../../hooks/ImageHooks";
import {handleApiError} from "../../errorHandler/handleError";

export const CriarFerragem = () => {
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const [createFerragem] = useCreateFerragemMutation();
    const [isDisabled, setIsDisabled] = useState(false);
    const [ferragem, setFerragem] = useState<Ferragem>(
        initialState || ({} as Ferragem)
    );
    const handleImageUpload = useHandleImageUpload();
    const [ferragemState, setFerragemState] = useState<Ferragem>(
        ferragem || ({} as Ferragem)
    );
    const [isLoading, setIsLoading] = useState(false);

    interface SelectedFileState {
        deleteImage: boolean;
        file: File | null;
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>, selectedFileState: SelectedFileState) {
        event.preventDefault();

        setIsLoading(true);
        if (!validate()) {
            setIsLoading(false);
            return;
        }
        try {

            const response = await createFerragem(ferragemState).unwrap();

            if (response.id && selectedFileState.file) {
                await handleImageUpload(response.id, selectedFileState.file);
            }

            setIsDisabled(true);
            navigate('/ferragem');

        } catch (error) {
            handleApiError(error, 'Erro ao criar a Ferragem', enqueueSnackbar);
        }
        setIsLoading(false);

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
            tempErrors = {...tempErrors, descricao: "Descrição é obrigatória."};
        }
        if (!ferragemState.cor) {
            isValid = false;
            tempErrors = {...tempErrors, cor: "Cor é obrigatória."};
        }
        if (ferragemState.preco <= 0) {
            isValid = false;
            tempErrors = {...tempErrors, preco: "Preço precisa ser maior que 0,00."};
        }
        if (!ferragemState.unidade) {
            isValid = false;
            tempErrors = {...tempErrors, unidade: "Unidade é obrigatória."};
        }
        if (!ferragemState.precificacao) {
            isValid = false;
            tempErrors = {...tempErrors, precificacao: "Precificação é obrigatória."};
        }

        setErrors(tempErrors);
        return isValid;
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
                    onSubmit={({event, selectedFileState}) => {
                        handleSubmit(event, selectedFileState).then(r => {
                        });
                    }}
                    handleChange={handleChange}
                    handleSelect={handleSelect}
                    validateErrors={errors}
                />
            </Paper>
        </Box>
    );
};
