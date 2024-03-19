import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface BotaoSecundarioProps extends ButtonProps {
  largura?: string | number; // Você pode passar a largura como propriedade do botão, se desejar
}

const BotaoSecundario: React.FC<BotaoSecundarioProps> = ({ largura, ...props }) => {
  return (
    <Button
      variant="outlined"
      color="secondary"
      sx={{
        width: largura,
        borderColor: 'secondary.main',
        color: 'text.secondary',
        ':hover': {
          color: 'white',
          fontWeight: '600', 
          bgcolor: 'secondary.light',
          borderColor: 'secondary.dark',
        },
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
};

export default BotaoSecundario;
