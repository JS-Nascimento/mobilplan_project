import { Box, Button, Typography } from "@mui/material";
import { useAppSelector } from "../../../../app/hooks";
import { selectFerragem } from "./ferragemSlice";
import { Create } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import React from "react";

export const ListarFerragem = () => {
  const ferragens = useAppSelector(selectFerragem);

  //use ferragens to populate the DataGrid
  const rows: GridRowsProp = ferragens.map((ferragem) => ({
    id: ferragem.id,
    imagem:ferragem.imagem,
    descricao: ferragem.descricao,
    cor: ferragem.cor,
    unidade: ferragem.unidade,
    preco: ferragem.preco,
    precificacao: ferragem.precificacao,
    alteradoEm: ferragem.atualizadoEm,
  }));

  const columns: GridColDef[] = [
    { field: "id", headerName: "#ID", width: 25 },
    { field: "imagem", headerName: "Imagem", width: 75 },
    { field: "descricao", headerName: "Descrição", width: 300 },
    { field: "cor", headerName: "Cor", width: 150 },
    { field: "unidade", headerName: "Unidade", width: 100 },
    { field: "preco", headerName: "Preço", width: 100 },
    { field: "precificacao", headerName: "Precificado por", width: 150 },
    { field: "alteradoEm", headerName: "Alterado em", width: 200 },

  ];

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 20,
    page: 0,
  });

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
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
      <DataGrid
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rows={rows}
        columns={columns}
      />
    </Box>
  );
};
