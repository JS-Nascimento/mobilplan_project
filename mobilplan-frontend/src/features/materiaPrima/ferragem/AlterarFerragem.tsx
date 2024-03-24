import {useNavigate, useParams} from "react-router-dom";
import {Box, Paper, Typography} from "@mui/material";
import {SelectChangeEvent} from "@mui/material/Select";
import React, {ChangeEvent, useEffect, useState} from "react";
import FerragemForm from "../../../components/MateriaPrima/Ferragem/FerragemForm";
import {
    Ferragem,
    initialState,
    useDeleteFerragemImagemMutation,
    useGetFerragemByIdQuery,
    useUpdateFerragemImagemMutation,
    useUpdateFerragemMutation
} from "./ferragemSlice";
import {useSnackbar} from "notistack";
import LoadingSpinner from "../../../components/CustomSpinner/LoadingSpinner";
import {useHandleImageUpload} from "../../hooks/ImageHooks";
import {handleApiError} from "../../errorHandler/handleError";

export const AlterarFerragem = () => {
    const navigate = useNavigate();
    const id = Number(useParams<{ id: string }>().id || 0);
    const {data, isFetching} = useGetFerragemByIdQuery(id);
    const [updateFerragem, status] = useUpdateFerragemMutation();
    const [updateFerragemImagem] = useUpdateFerragemImagemMutation();
    const [deleteFerragemImagem] = useDeleteFerragemImagemMutation();
    const [ferragemState, setFerragemState] = useState<Ferragem>(
        initialState || ({} as Ferragem)
    );
    const handleImageUpload = useHandleImageUpload();
    const {enqueueSnackbar} = useSnackbar();
    const [selectedFile, setSelectedFile] = useState<SelectedFileState>({deleteImage: false, file: null});
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

            await updateFerragem({id, data: ferragemState}).unwrap();

            // Se existe um novo arquivo para upload, independente se o nome é diferente ou não
            if (selectedFileState.file) {
                const imagemAtual = await handleImageUpload(id, selectedFileState.file) ?? null;
                setFerragemState(prevState => ({...prevState, imagem: imagemAtual}));
            }
            // Se não há arquivo selecionado, e uma imagem estava anteriormente associada, ela deve ser removida
            else if (selectedFileState.deleteImage && ferragemState.imagem) {
                await deleteFerragemImagem({id, url: ferragemState.imagem}).unwrap();
                setFerragemState(prevState => ({...prevState, imagem: null}));
            }

            setSelectedFile({deleteImage: false, file: null});

            enqueueSnackbar("Ferragem atualizada com sucesso!", {variant: "success"});
            navigate('/ferragem');


        } catch (error) {
            handleApiError(error, 'Erro ao atualizar a Ferragem', enqueueSnackbar);
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


    useEffect(() => {
        if (data) {
            setFerragemState(data);
        }
    }, [data]);

    useEffect(() => {
        setIsLoading(isFetching || status.isLoading);
    }, [isFetching, status.isLoading]);

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
                {isLoading ? (
                    <LoadingSpinner/>
                ) : (
                    <FerragemForm
                        ferragem={ferragemState}
                        isDisabled={status.isLoading}
                        onSubmit={({event, selectedFileState}) => {
                            handleSubmit(event, selectedFileState).then(r => {
                            });
                        }}

                        handleChange={handleChange}
                        handleSelect={handleSelect}
                        validateErrors={errors}
                    />
                )}
            </Paper>
        </Box>
    );
};
