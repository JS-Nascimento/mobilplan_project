import { createTheme } from '@mui/material/styles';
import '@fontsource/montserrat/400.css'; // Fonte regular
import '@fontsource/montserrat/700.css'; // Fonte em negrito

export const appTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#d9d9d9',
            contrastText: '#383830',
        },
        secondary: {
            main: '#989898',
            contrastText: '#fff'
        },
        background: {
            default: '#f0f0f0',
            paper: '#d9d9d9',
        },
        text: {
            primary: '#3d3935',
            secondary: '#333333',
            
        }
    

    },
    typography: {
        fontFamily: 'Montserrat',
      },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 5,
                    color: 'white',
                },
                outlined: {
                    textTransform: 'none',
                    borderRadius: 5,
                    color: 'primary.contrastText',
                    borderColor: 'primary.contrastText',
                }  
            },
        },
}
});