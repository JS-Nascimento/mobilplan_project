import React from 'react';
import { Switch, SwitchProps, styled } from '@mui/material';

// Example of creating a custom-styled MUI Switch that turns blue when checked
const CustomSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme, checked }) => ({
    '& .MuiSwitch-switchBase': {
        color: checked ? theme.palette.primary.main : undefined,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: 'rgb(28,171,59)',
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
    },
}));

export default CustomSwitch;
