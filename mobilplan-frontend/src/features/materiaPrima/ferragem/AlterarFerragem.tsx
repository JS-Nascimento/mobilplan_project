import {useNavigate} from "react-router-dom";
import {Box, Paper, Typography} from "@mui/material";
import {SelectChangeEvent} from "@mui/material/Select";
import {ChangeEvent, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import FerragemForm from "../../../components/MateriaPrima/Ferragem/FerragemForm";
import {
    Ferragem,
    initialState,
    useGetFerragemByIdQuery,
    useUpdateFerragemImagemMutation,
    useUpdateFerragemMutation
} from "./ferragemSlice";
import {useSnackbar} from "notistack";

export const AlterarFerragem = () => {
    const navigate = useNavigate();
    const id = Number(useParams<{ id: string }>().id || 0);
    const {data, isFetching} = useGetFerragemByIdQuery(id);
    const [updateFerragem, status] = useUpdateFerragemMutation();
    const [updateFerragemImagem] = useUpdateFerragemImagemMutation();
    const [ferragemState, setFerragemState] = useState<Ferragem>(
        initialState || ({} as Ferragem)
    );
    const {enqueueSnackbar} = useSnackbar();
    const [selectedFile, setSelectedFile] = useState<SelectedFile>({name: null, file: null});

    type SelectedFile = {
        name: string | null;
        file: File | null;
    };


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>, selectedName: string | null, selectedFile: File | null) {
        event.preventDefault();

        status.isLoading = true;
        if (!validate()) {
            return;
        }

        let imageUrl = ferragemState.imagem ? ferragemState.imagem : null;

        try {
            await updateFerragem({id, data: ferragemState}).unwrap();

            if (selectedFile && (selectedName !== ferragemState.imagem)) {

                imageUrl = await handleImageUpload(id, selectedFile) ?? imageUrl;
                setFerragemState(prevState => ({...prevState, imagem: imageUrl}));
                status.isLoading = false;
            }

        } catch (error) {

            enqueueSnackbar("Erro ao atualizar ferragem.", {variant: "error"});
            console.error('Erro ao atualizar ferragem:', error);
            status.isLoading = false;
        }

    }

    const handleImageUpload = async (id : number, file : File) => {
        if (selectedFile) {
            try {

                const newImageUrl = await updateFerragemImagem({id, file}).unwrap();
                return newImageUrl;

            } catch (error) {
                console.error('Erro ao atualizar a imagem:', error);
            }
        }
    };


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
            console.log('data:', data);
            setFerragemState(data);
        }
    }, [data]);

    useEffect(() => {
        if (status.isSuccess) {
            enqueueSnackbar("Ferragem atualizada com sucesso!", {variant: "success"});
            navigate('/ferragem');
        }
        if (status.isError) {
            enqueueSnackbar("Erro ao atualizar ferragem", {variant: "error"});
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
                Editar Ferragem
            </Typography>
            <Paper>
                <FerragemForm
                    ferragem={ferragemState}
                    isDisabled={status.isLoading}
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
