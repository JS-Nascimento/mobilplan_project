import React from 'react';
import {Typography} from '@mui/material';

interface DataLabelProps {
    data: string;
  }

export const CriadoEmLabel = ({ data }: DataLabelProps) => {

    return (
      <Typography variant="body2" color="textSecondary">
        Criado em: {data}
      </Typography>
    );
  };

export const AtualizadoEmLabel = ({ data } : DataLabelProps) => {

  return (
    <Typography variant="body2" color="textSecondary">
      Atualizado em: {data}
    </Typography>
  );
};
