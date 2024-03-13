import {Create} from "@mui/icons-material";
import {Box, Grid, Typography} from "@mui/material";
import {GridColDef, GridRenderCellParams, GridRowParams, GridRowsProp,} from "@mui/x-data-grid";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import CustomDataGrid from "../../../../components/CustomDataGrid/CustomDataGrid";
import {removerFerragem, selectFerragem} from "./ferragemSlice";
import BotaoImportar from "../../../../components/CustomButtons/BotaoImportar";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CustomButton from "../../../../components/CustomButtons/CustomButton";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorSnackbar from "../../../../components/SnackErrorBar/ErrorSnackbar";
import {ConfirmationDialog} from "../../../../components/CustomModals/ConfirmationDialog";

export const ListarFerragem = () => {
    const ferragens = useAppSelector(selectFerragem);
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [errorSnackbarKey, setErrorSnackbarKey] = useState<number>(0);
    const [openDialog, setOpenDialog] = useState(false);
    const dispatch = useAppDispatch();

    const rows: GridRowsProp = ferragens.map((ferragem) => ({
        id: ferragem.id,
        imagem: ferragem.imagem,
        descricao: ferragem.descricao,
        cor: ferragem.cor,
        unidade: ferragem.unidade,
        preco: ferragem.preco,
        precificacao: ferragem.precificacao,
        alteradoEm: ferragem.atualizadoEm,
    }));

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "#ID",
            width: 25,
            resizable: true,
        },
        {field: "imagem", headerName: "Imagem", width: 75, resizable: true},
        {field: "descricao", headerName: "Descrição", flex: 1},
        {field: "cor", headerName: "Cor", width: 150, resizable: true},
        {field: "unidade", headerName: "Unidade", width: 100, resizable: true},
        {field: "preco", headerName: "Preço", width: 100, resizable: true},
        {
            field: "precificacao",
            headerName: "Precificado por",
            width: 150,
            resizable: true,
        },
        {
            field: "alteradoEm",
            headerName: "Alterado em",
            width: 200,
            resizable: true,
        },
    ];
    const handleRowClick = (params: GridRowParams) => {
        console.log("params: ", params);
        setSelectedId(params.id as number);
    };

    const handleEditClick = () => {
        if (selectedId !== null) {
            console.log("selectedId: ", selectedId);
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
            handleError('Por favor, selecione uma linha para deletar.');
        }
    };

    const handleConfirmDelete = () => {
        dispatch(removerFerragem(selectedId));
        setSelectedId(null); // Resetar a seleção
        setOpenDialog(false);
    };

    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 20,
        page: 0,
    });

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
                            ':hover': {
                                color: '#3d3835',
                                bgcolor: 'rgba(102, 0, 0, 0.5)',
                            },
                        }}/>
                    <BotaoImportar larguraBotaoMenu="20px"
                                   sx={{pl: 3, pr: 3,
                                       height: 36, // Altura fixa para o botão, ajuste conforme necessário
                                       minHeight: 36,
                                   fontSize: {xs:10, sm: 12, md: 14}}}
                                   startIcon={<FileUploadIcon/>}
                                   variant="contained"
                                   color="secondary"/>
                </Grid>
            </Grid>
            <CustomDataGrid
                disableColumnResize={false}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                rows={rows}
                columns={columns}
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

function renderNameCell(rowData: GridRenderCellParams) {
    return (
        <Link style={{textDecoration: "none"}} to={`/ferragem/${rowData.row.id}`}>
            <Typography color={"primary.contrastText"}>{rowData.row.id}</Typography>
        </Link>
    );
}
