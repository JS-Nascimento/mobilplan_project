import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, Grid, Typography} from '@mui/material';
import {GridColDef, GridPaginationModel, GridRowParams, GridRowsProp} from '@mui/x-data-grid';
import {useSnackbar} from 'notistack';
import CustomDataGrid from '../../../components/CustomDataGrid/CustomDataGrid';
import {ferragensApiSlice, useDeleteFerragemMutation, useGetFerragensQuery} from './ferragemSlice';
import CustomButton from '../../../components/CustomButtons/CustomButton';
import ErrorSnackbar from '../../../components/SnackErrorBar/ErrorSnackbar';
import {ConfirmationDialog} from '../../../components/CustomModals/ConfirmationDialog';
import {Content} from '../../../types/ferragem';
import {formatarPreco} from '../../../utils/formatNumersHelper';
import {Create} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BotaoImportar from '../../../components/CustomButtons/BotaoImportar';
import {capitalizeFirstLetter} from "../../../utils/StringUtilsHelper";

export const ListarFerragem = () => {
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({pageSize: 10, page: 0});
    const {data, isFetching, error, isError} = useGetFerragensQuery({
        page: paginationModel.page, // A API espera que a paginação comece de 1
        size: paginationModel.pageSize,
    });
    const [deleteFerragem, deleteFerragemStatus] = useDeleteFerragemMutation();

    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [errorSnackbarKey, setErrorSnackbarKey] = useState<number>(0);
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');


    const rows: GridRowsProp = data?.content.map((ferragem: Content) => ({
        id: ferragem.id,
        imagem: ferragem.imagem,
        descricao: ferragem.descricao,
        cor: ferragem.cor,
        unidade: capitalizeFirstLetter(ferragem.unidade),
        preco: formatarPreco(ferragem.preco.toString()),
        precificacao: capitalizeFirstLetter(ferragem.precificacao),
        alteradoEm: ferragem.atualizadoEm,
    })) || [];

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "#ID",
            width: 25,
            headerAlign: 'center', align: 'center',
        },
        {field: "imagem", headerName: "Imagem", width: 75, headerAlign: 'center', align: 'center'},
        {field: "descricao", headerName: "Descrição", flex: 1},
        {field: "cor", headerName: "Cor", width: 150, headerAlign: 'center', align: 'center'},
        {field: "unidade", headerName: "Unidade", width: 100, headerAlign: 'center', align: 'center'},
        {field: "preco", headerName: "Preço", width: 100, headerAlign: 'right', align: 'right'},
        {
            field: "precificacao",
            headerName: "Precificado por",
            width: 150,
            headerAlign: 'center', align: 'center'
        },
        {
            field: "alteradoEm",
            headerName: "Alterado em",
            width: 200,
            headerAlign: 'right', align: 'right',
        },
    ];

    const handleRowClick = (params: GridRowParams) => {
        setSelectedId(params.id as number);
    };

    const handleEditClick = () => {
        if (selectedId !== null) {
            navigate(`/ferragem/${selectedId}`);
        } else {
            setErrorMessage('Por favor, selecione uma linha para editar.');
            setShowError(true);
        }
    };

    const handleError = (message: string) => {
        setErrorMessage(message);
        setShowError(true);
        setErrorSnackbarKey(prevKey => prevKey + 1);
    };

    const handleDeleteClick = () => {
        if (selectedId !== null) {
            setOpenDialog(true);

        } else {
            enqueueSnackbar('Por favor, selecione uma linha para deletar.');
        }
    };

    async function handleConfirmDelete() {
        if (selectedId === null) {
            enqueueSnackbar('Por favor, selecione uma linha para deletar.');
            return;
        }
        await deleteFerragem(selectedId);
        ferragensApiSlice.util.invalidateTags(['Ferragens']);
        setSelectedId(null); // Resetar a seleção
        setOpenDialog(false);

    }

    useEffect(() => {
        if (deleteFerragemStatus.isSuccess) {
            enqueueSnackbar("Ferragem deletada com sucesso!", {variant: "success"});
        }
        if (deleteFerragemStatus.isError) {
            enqueueSnackbar("Erro ao deletar ferragem!", {variant: "error"});
        }
        if (error) {
            enqueueSnackbar("Erro ao carregar Ferragens", {variant: "error"});
        }
    }, [deleteFerragemStatus, enqueueSnackbar, error]);

    const handlePaginationModelChange = (model: GridPaginationModel) => {
        setPaginationModel(model);
    };

    return (
        <Box maxWidth="lg" sx={{height: 650, mt: 4, mb: 4}}>
            {showError && (
                <ErrorSnackbar
                    key={errorSnackbarKey} // Usa a chave para forçar o re-render
                    errorMessage={errorMessage}
                    onClose={() => setShowError(false)}
                />
            )}
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                <Grid item xs={12} sm={4}>
                    <Typography
                        sx={{

                            typography: {
                                xs: "h6",
                                sm: "h6",
                                md: "h5",
                                lg: "h5",
                            },
                        }}
                    >
                        Ferragens
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={8}
                    display="flex"
                    justifyContent="flex-end"
                    gap={1}
                >
                    <CustomButton
                        label={"Novo"}
                        icon={<AddIcon/>}
                        largura="100px"
                        variant="contained"
                        color="secondary"
                        forwardTo="/ferragem/criar"
                        sx={{
                            mb: {xs: ".5rem", sm: "1rem"},
                            pl: 3, pr: 3,
                            height: 36, // Altura fixa para o botão, ajuste conforme necessário
                            minHeight: 36,
                            fontSize: {xs: 10, sm: 12, md: 14},
                            ':hover': {
                                color: '#3d3835',
                                bgcolor: 'rgba(7, 55, 99, 0.5)',
                            }
                        }}/>
                    <CustomButton
                        label={"Editar"}
                        icon={<Create/>}
                        largura="100px"
                        variant="contained"
                        color="secondary"
                        onClick={handleEditClick}
                        sx={{
                            mb: {xs: ".5rem", sm: "1rem"},
                            pl: 3,
                            pr: 3,
                            height: 36,
                            minHeight: 36,
                            fontSize: {xs: 10, sm: 12, md: 14},
                            ':hover': {
                                color: '#3d3835',
                                bgcolor: 'rgba(38, 95, 41, 0.5)',
                            }
                        }}/>
                    <CustomButton
                        label={"Deletar"}
                        icon={<DeleteIcon/>}
                        largura="100px"
                        variant="outlined"
                        color="secondary"
                        onClick={handleDeleteClick}
                        sx={{
                            mb: {xs: ".5rem", sm: "1rem"},
                            pl: 3, pr: 3,
                            height: 36,
                            minHeight: 36,
                            fontSize: {xs: 10, sm: 12, md: 14},
                            ':hover': {
                                color: '#3d3835',
                                bgcolor: 'rgba(102, 0, 0, 0.5)',
                            },
                        }}/>
                    <BotaoImportar larguraBotaoMenu="20px"
                                   sx={{
                                       pl: 3, pr: 3,
                                       height: 36, // Altura fixa para o botão, ajuste conforme necessário
                                       minHeight: 36,
                                       fontSize: {xs: 10, sm: 12, md: 14}
                                   }}
                                   startIcon={<FileUploadIcon/>}
                                   variant="contained"
                                   color="secondary"/>
                </Grid>
            </Grid>
            <CustomDataGrid
                rows={rows}
                columns={columns}
                isFetching={isFetching}
                totalRows={data?.totalElements ?? 0}
                totalPages={data?.totalPages ?? 0}
                rowCount={data?.totalElements ?? 0}
                paginationModel={paginationModel}
                handlePaginationModel={handlePaginationModelChange}
                onRowClick={handleRowClick}
            />
            <ConfirmationDialog
                open={openDialog}
                title="Confirmar Deleção"
                message="Tem certeza que deseja deletar esta ferragem selecionada?"
                onConfirm={handleConfirmDelete}
                onCancel={() => setOpenDialog(false)}
            />
        </Box>
    );
};