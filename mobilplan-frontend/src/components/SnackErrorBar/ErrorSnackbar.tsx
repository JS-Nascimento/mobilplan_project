import React, { useState } from 'react';
import { Snackbar, Alert, AlertColor, SnackbarCloseReason } from '@mui/material';

interface ErrorSnackbarProps {
    errorMessage: string;
    onClose: () => void; // Adiciona a propriedade onClose
}

const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({ errorMessage, onClose }) => {
    const [open, setOpen] = useState(true);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        onClose(); // Chama a função onClose passada como propriedade
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Posiciona o Snackbar no canto superior direito.
            sx={{
                top: { xs: '100px', sm: '30px' }, // Ajusta o posicionamento para ser um pouco mais abaixo do topo, responsivamente.
                right: { xs: '10px', sm: '20px' } // Você pode ajustar o espaçamento da direita aqui, se necessário.
            }}
        >
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {errorMessage}
            </Alert>
        </Snackbar>
    );
}

export default ErrorSnackbar;
