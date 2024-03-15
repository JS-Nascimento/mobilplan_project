import {Create} from "@mui/icons-material";
import {Box, Grid, Typography} from "@mui/material";
import {GridColDef, GridFilterModel, GridPaginationModel, GridRowParams, GridRowsProp,} from "@mui/x-data-grid";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import CustomDataGrid from "../../../components/CustomDataGrid/CustomDataGrid";
import {useDeleteFerragemMutation, useGetFerragensQuery} from "./ferragemSlice";
import BotaoImportar from "../../../components/CustomButtons/BotaoImportar";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CustomButton from "../../../components/CustomButtons/CustomButton";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorSnackbar from "../../../components/SnackErrorBar/ErrorSnackbar";
import {ConfirmationDialog} from "../../../components/CustomModals/ConfirmationDialog";
import {useSnackbar} from "notistack";
import {Content, Pagination} from "../../../types/ferragem";
import { skipToken } from "@reduxjs/toolkit/query";
import {formatarPreco} from "../../../utils/formatNumersHelper";

export const ListarFerragem = () => {
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [errorSnackbarKey, setErrorSnackbarKey] = useState<number>(0);
    const [openDialog, setOpenDialog] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        pageSize: 0,
        page: 0,
    });
    const [searchText, setSearchText] = useState<string>("");

    const filterOptions: Pagination = {
       page: paginationModel.page,
       size: paginationModel.pageSize,
    };
    const {data, isFetching, isError, error} = useGetFerragensQuery(filterOptions);
    const [deleteFerragem, deleteFerragemStatus] = useDeleteFerragemMutation();

    const rows: GridRowsProp = data ? data.content.map((ferragem: Content) => ({
        id: ferragem.id,
        imagem: ferragem.imagem,
        descricao: ferragem.descricao,
        cor: ferragem.cor,
        unidade: ferragem.unidade,
        preco: formatarPreco(ferragem.preco.toString()),
        precificacao: ferragem.precificacao,
        alteradoEm: ferragem.atualizadoEm,
    })) : [];

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "#ID",
            width: 25,
            headerAlign:'center',  align: 'center',
        },
        {field: "imagem", headerName: "Imagem", width: 75,headerAlign:'center',  align: 'center' },
        {field: "descricao", headerName: "Descrição", flex: 1},
        {field: "cor", headerName: "Cor", width: 150, headerAlign:'center',  align: 'center'},
        {field: "unidade", headerName: "Unidade", width: 100, headerAlign:'center',  align: 'center'},
        {field: "preco", headerName: "Preço", width: 100, headerAlign:'right',  align: 'right'},
        {
            field: "precificacao",
            headerName: "Precificado por",
            width: 150,
            headerAlign:'center',  align: 'center'
        },
        {
            field: "alteradoEm",
            headerName: "Alterado em",
            width: 200,
            headerAlign:'right',  align: 'right',
        },
    ];
    const handleRowClick = (params: GridRowParams) => {
        console.log("params: ", params);
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
        setSelectedId(null); // Resetar a seleção
        setOpenDialog(false);

    };

    useEffect(() => {
        if (deleteFerragemStatus.isSuccess) {
            enqueueSnackbar("Ferragem deletada com sucesso!", {variant: "success"});
        }
        if (deleteFerragemStatus.isError) {
            enqueueSnackbar("Erro ao deletar ferragem!", {variant: "error"});
        }
    }, [deleteFerragemStatus, enqueueSnackbar]);

    function handlePaginationModel(newPaginationModel: GridPaginationModel) {
        setPaginationModel(() => ({
            page : filterOptions.page,
            pageSize : filterOptions.size,
        }));
    }

    function handleFilterChange(filterModel: GridFilterModel) {
        console.log("filter model change");
    }

    return (
        <Box maxWidth="lg" sx={{mt: 4, mb: 4}}>
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
                paginationModel={paginationModel}
                handlePaginationModel={handlePaginationModel}
                handleFilterChange={handleFilterChange}
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