import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface BotaoSecundarioProps extends ButtonProps {
  largura?: string | number; // Você pode passar a largura como propriedade do botão, se desejar
}

const BotaoSecundario: React.FC<BotaoSecundarioProps> = ({ largura = '200px', ...props }) => {
  return (
    <Button
      variant="outlined" // Diferentemente do botão primário, este pode ser "outlined"
      color="secondary" // Utiliza a cor secundária do tema
      sx={{
        width: largura,
        borderColor: 'secondary.main', // Define a cor da borda para a cor secundária do tema
        color: 'text.secondary', // Define a cor do texto para a cor secundária do tema
        ':hover': {
          color: 'white',
          fontWeight: '600', 
          bgcolor: 'secondary.light', // Define uma cor de fundo mais clara para o estado de hover
          borderColor: 'secondary.dark', // Escurece a borda no hover
        },
        // Para uma cor customizada quando não está focado, você pode definir aqui
        // Lembre-se, para um botão outlined, a cor de fundo geralmente é transparente
      }}
      {...props} // Espalha todas as outras props recebidas
    >
      {props.children}
    </Button>
  );
};

export default BotaoSecundario;
