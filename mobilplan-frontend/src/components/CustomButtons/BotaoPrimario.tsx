import React from 'react';
import { Button, ButtonProps, useTheme } from '@mui/material';

interface BotaoPrimarioProps extends ButtonProps {}

const BotaoPrimario: React.FC<BotaoPrimarioProps> = (props) => {
    const theme = useTheme();

    return (
        <Button
            variant="contained"
            color="primary" // Define a cor do botão
            sx={{
                color: theme.palette.text.primary, // Cor do texto
                fontWeight: '600',
                ':hover': {
                    bgcolor: theme.palette.secondary.main,
                    color: theme.palette.common.white,
                },
                ...props.sx, // Permite estilos sx adicionais passados como props
            }}
            {...props}
        >
            {props.children}
        </Button>
    );
};

export default BotaoPrimario;
