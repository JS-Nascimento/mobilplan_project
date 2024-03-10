import React from "react";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { useAppSelector } from "../../../../app/hooks";
import { selectFerragem } from "./ferragemSlice";
import { Create } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import { useNavigate } from 'react-router-dom';
import CustomDataGrid from "../../../../components/CustomDataGrid/CustomDataGrid";

export const ListarFerragem = () => {
  const ferragens = useAppSelector(selectFerragem);
  const navigate = useNavigate();

  //use ferragens to populate the DataGrid
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
    { field: "id", headerName: "#ID", width: 25, resizable: true, renderCell: renderNameCell},
    { field: "imagem", headerName: "Imagem", width: 75, resizable: true },
    { field: "descricao", headerName: "Descrição", flex: 1 },
    { field: "cor", headerName: "Cor", width: 150, resizable: true },
    { field: "unidade", headerName: "Unidade", width: 100, resizable: true },
    { field: "preco", headerName: "Preço", width: 100, resizable: true },
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
    navigate(`/ferragem/${params.id}`); 
  }


  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 20,
    page: 0,
  });

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between">
      <Typography 
     sx={{
      typography: {
        xs: "h6",
        sm: "h6",
        md: "h5",
        lg: "h5",
      },
    }}
      >Ferragens</Typography>
        <Button
          startIcon={<Create />}
          variant="contained"
          color="secondary"
          component={Link}
          to="/ferragem/criar"
          style={{ marginBottom: "1rem", paddingLeft: 20, paddingRight: 20 }}
        >
          <Typography variant="subtitle1">Novo</Typography>
        </Button>
      </Box>
      <CustomDataGrid
        disableColumnResize={false}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rows={rows}
        columns={columns}
        onRowDoubleClick={handleRowClick} 
      />
    </Box>
  );
};

function renderNameCell(rowData: GridRenderCellParams) {
  return (
    <Link style={{ textDecoration: "none" }} to={`/ferragem/${rowData.row.id}`}>
      <Typography color={"primary.contrastText"}>{rowData.row.id}</Typography>
    </Link>
  );
}
