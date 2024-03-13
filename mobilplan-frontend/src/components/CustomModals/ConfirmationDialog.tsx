import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from '@mui/material';
import CustomButton from "../CustomButtons/CustomButton";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

interface ConfirmationDialogProps {
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({open, title, message, onConfirm, onCancel}) => {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions >
                <CustomButton
                    label={"Cancelar"}
                    icon={<ClearIcon/>}
                    largura="100px"
                    variant="outlined"
                    color="secondary"
                    onClick={onCancel}
                    sx={{
                        mb: {xs: ".5rem", sm: "1rem"},
                        pl: 3, pr: 3,
                        ':hover': {
                            color: '#3d3835',
                            bgcolor: 'rgba(102, 0, 0, 0.5)',
                        },
                    }}/>
                <CustomButton
                    autoFocus={true}
                    label={"Confirmar"}
                    icon={<CheckIcon/>}
                    largura="100px"
                    variant="contained"
                    color="secondary"
                    onClick={onConfirm}
                    sx={{
                        mb: {xs: ".5rem", sm: "1rem"},
                        pl: 3,
                        pr: 3,
                        ':hover': {
                            color: '#3d3835',
                            bgcolor: 'rgba(38, 95, 41, 0.5)',
                        }
                    }}/>
            </DialogActions>
        </Dialog>
    );
};
