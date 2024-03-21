import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

interface CustomTooltipHelperProps {
    title: string;
    imageSrc: string;
}

export const CustomTooltipHelper: React.FC<CustomTooltipHelperProps> = ({ title, imageSrc }) => {
    return (
        <Tooltip
            title={
                <React.Fragment>
                    <Typography color="inherit">{title}</Typography>
                    <Box
                        component="img"
                        src={imageSrc}
                        alt="Descrição da imagem"
                        sx={{ maxWidth: 300, mt: 1 }}
                    />
                </React.Fragment>
            }
        >
            <IconButton>
                <HelpOutlineIcon />
            </IconButton>
        </Tooltip>
    );
};
