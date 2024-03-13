import React from 'react';
import {Button, ButtonProps} from '@mui/material';
import {Link} from "react-router-dom";

interface CustomButtonProps extends ButtonProps {
    label: string;
    icon: React.ReactNode;
    largura?: string | number;
    forwardTo?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({label, icon, forwardTo, largura, ...props}) => {

    const linkProps = forwardTo ? { component: Link, to: forwardTo } : {};

    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={icon}
            { ...linkProps}
            sx={{
                width: largura,
                ':hover': {
                    color: 'white',
                    bgcolor: 'secondary.main',
                },
                color: 'text.secondary',
                fontWeight: '600',
            }}
            {...props}
        >{label}{props.children}
        </Button>
    );
};

export default CustomButton;
