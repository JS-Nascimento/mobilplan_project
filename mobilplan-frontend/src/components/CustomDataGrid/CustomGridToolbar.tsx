import React from 'react';
import { Box } from '@mui/material';
import {
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
 
} from '@mui/x-data-grid';

export function CustomGridToolbar() {
  return (
    <GridToolbarContainer
      sx={{
        backgroundColor: 'background.default', // Cor de fundo do tema
        color: '#d9d9d9', // Cor do texto personalizada
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box>
        <GridToolbarColumnsButton sx={{ color: '#d9d9d9' }} />
        <GridToolbarFilterButton sx={{ color: '#d9d9d9'  }} />
        <GridToolbarDensitySelector sx={{ color: '#d9d9d9', 
        '& .MuiSvgIcon-root': { color: 'd9d9d9#' } }} />
        <GridToolbarExport sx={{ color: '#d9d9d9' }} />
      </Box>
      <GridToolbarQuickFilter
        placeholder='Filtrar...'
        sx={{
          '.MuiInputBase-input': {
            color: '#d9d9d9', // Cor do texto para o input do QuickFilter
          },
          '.MuiSvgIcon-root': {
            color: '#d9d9d9', // Cor dos ícones, se necessário
          },
        }}
        quickFilterParser={(value) => value.split(' ')}
      />
    </GridToolbarContainer>
  );
}
