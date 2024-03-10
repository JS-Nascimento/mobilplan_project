import React from 'react';
import { Typography } from '@mui/material';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DataLabelProps {
    data: string;
  }
// Componente para exibir a data de criação
export const CriadoEmLabel = ({ data }: DataLabelProps) => {
    //const dataFormatada = format(parseISO(data), "dd/MM/yyyy HH:mm:ss", { locale: ptBR });
  
    return (
      <Typography variant="body2" color="textSecondary">
        Criado em: {data}
      </Typography>
    );
  };
// Componente para exibir a data de atualização
export const AtualizadoEmLabel = ({ data } : DataLabelProps) => {
  // Formata a data ISO para o formato desejado
  //const dataFormatada = format(parseISO(data), "dd/MM/yyyy HH:mm:ss", { locale: ptBR });

  return (
    <Typography variant="body2" color="textSecondary">
      Atualizado em: {data}
    </Typography>
  );
};
