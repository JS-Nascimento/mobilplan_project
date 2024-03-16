import React from "react";
import {DataGrid, DataGridProps, GridColDef, GridFilterModel, GridRowsProp,} from "@mui/x-data-grid";
import {ThemeProvider} from "@mui/material/styles";
import {appTheme} from "../../config/theme";
import {CustomGridToolbar} from "./CustomGridToolbar"; //

interface CustomDataGridProps extends Omit<DataGridProps, "rows" | "columns"> {
    rows: GridRowsProp;
    columns: GridColDef[];
    isFetching?: boolean;
    totalRows: number;
    totalPages: number;
    paginationModel?: PaginationModelProps;
    handlePaginationModel?: (pageChange: PaginationModelProps) => void;
}

type PaginationModelProps = {

    pageSize: number;
    page: number;

};


const CustomDataGrid: React.FC<CustomDataGridProps> = ({
                                                           rows,
                                                           columns,
                                                           isFetching,
                                                           totalRows,
                                                           totalPages,
                                                           paginationModel,
                                                           handlePaginationModel,
                                                           ...props
                                                       }) => {


    return (
        <ThemeProvider theme={appTheme}>
            <DataGrid
                density={"compact"}
                rows={rows}
                columns={columns}
                loading={isFetching}
                paginationModel={paginationModel}
                paginationMode={"server"}
                rowCount={totalRows}
                pageSizeOptions={[2, 5, 10, 20, 50, 100]}
                onPaginationModelChange={handlePaginationModel}
                localeText={{
                    toolbarColumns: "Colunas",
                    toolbarColumnsLabel: "Colunas",
                    columnsPanelTextFieldLabel: "Buscar coluna",
                    columnsPanelTextFieldPlaceholder: "Título da coluna",
                    columnsPanelDragIconLabel: "Reordenar Coluna",
                    columnsPanelShowAllButton: "Mostrar Todas",
                    columnsPanelHideAllButton: "Esconder Todas",
                    toolbarFilters: "Filtros",
                    filterPanelInputLabel: "Valor do filtro",
                    filterPanelColumns: "Colunas",
                    filterPanelOperator: "Operadores",
                    filterPanelOperatorAnd: "E",
                    filterPanelOperatorOr: "Ou",
                    filterPanelInputPlaceholder: "Selecione a coluna",
                    toolbarDensity: "Altura das Linhas",
                    toolbarDensityLabel: "Densidade",
                    toolbarDensityCompact: "Compacta",
                    toolbarDensityStandard: "Padrão",
                    toolbarDensityComfortable: "Confortável",
                    toolbarExport: "Exportar",
                    toolbarExportLabel: "Exportar",
                    toolbarExportCSV: "para CSV",
                    toolbarExportExcel: "Excel",
                    toolbarExportPrint: "Imprimir",
                    filterOperatorContains: "Contém",
                    filterOperatorEquals: "Igual a",
                    filterOperatorStartsWith: "Começa com",
                    filterOperatorEndsWith: "Termina com",
                    filterOperatorIsEmpty: "Está vazio",
                    filterOperatorIsNotEmpty: "Não está vazio",
                    filterOperatorIsAnyOf: "É qualquer um de",
                    filterOperatorIs: "É igual a",
                    columnMenuLabel: "Menu",
                    columnMenuShowColumns: "Mostrar colunas",
                    columnMenuFilter: "Filtrar",
                    columnMenuHideColumn: "Esconder",
                    columnMenuUnsort: "Remover ordenação",
                    columnMenuSortAsc: "Ordenar ascendente",
                    columnMenuSortDesc: "Ordenar descendente",
                    columnMenuManageColumns: "Organizar colunas",

                    // Personalizar textos de paginação
                    footerRowSelected: (count) => `${count} linha(s) selecionada(s)`,
                    footerTotalRows: "Total de Linhas:",
                    // Se estiver usando paginação de servidor, talvez queira personalizar estes também
                    MuiTablePagination: {
                        labelRowsPerPage: "Linhas por página:",
                        labelDisplayedRows: ({from, to, count}) =>
                            `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`,
                    },
                    // Adicione mais substituições conforme necessário
                }}
                slots={{toolbar: CustomGridToolbar}}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
                {...props} // Espalha outras props do DataGrid aqui
                sx={{

                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: appTheme.palette.primary.main,
                        color: appTheme.palette.primary.contrastText,
                        ".MuiDataGrid-columnHeaderTitle": {
                            fontWeight: {xs: 600, sm: 600, md: 600, lg: 600},
                        },
                    },
                    '.Mui-selected': { // Esta classe é aplicada automaticamente às linhas selecionadas
                        backgroundColor: 'rgba(96, 0, 34, 0.12) !important', // Sobreposição de estilo para garantir aplicação
                        '&:hover': {
                            backgroundColor: 'rgba(96, 0, 34, 0.12) !important',
                        },
                    },
                    // Adicione mais estilos personalizados aqui conforme necessário
                }}
            />
        </ThemeProvider>
    );
};

export default CustomDataGrid;
