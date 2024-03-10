import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface BotaoPrimarioProps extends ButtonProps {
  largura?: string | number; // Você pode passar a largura como propriedade do botão, se desejar
}

const BotaoPrimario: React.FC<BotaoPrimarioProps> = ({ largura = '200px', ...props }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        width: largura, // Define a largura do botão
        ':hover': {
        
          color: 'white',
          bgcolor: 'secondary.main', // Modifica a cor de fundo quando o botão é focado (hover)
        },
        // Para modificar a cor quando não está focado, você deve usar o estado normal do botão
        // Isso pode significar alterar a cor "primary" no tema do MUI ou definir uma cor específica aqui
        color: 'text.secondary', // Esta linha pode não ser necessária se você estiver satisfeito com a cor secundária padrão
        backgroundColor: 'primary.main',
        fontWeight: '600', // Modifica o peso da fonte quando o botão é focado (hover) // Esta linha pode não ser necessária se você estiver satisfeito com a cor primária padrão
        // Para uma cor customizada não focada que não seja parte do tema, use algo como:
        // backgroundColor: '#suaCorCustomizada',
      }}
      {...props} // Espalha todas as outras props recebidas
    >
      {props.children}
    </Button>
  );
};

export default BotaoPrimario;
