import { createTheme } from '@mui/material/styles';
import '@fontsource/montserrat/400.css'; // Fonte regular
import '@fontsource/montserrat/500.css'; // Fonte em negrito
import '@fontsource/montserrat/600.css'; // Fonte em negrito
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
      contrastText: '#fff',
    },
    background: {
      default: '#383830',
      paper: '#d9d9d9',
    },
    text: {
      primary: '#3d3935',
      secondary: '#333333',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
        },
        rounded: {
          borderRadius: 5,
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        icon: {
          color: '#3d3935', // Cor do ícone
        },
      },
    },
    MuiInputLabel: { // Para customizar o label associado ao Select
      styleOverrides: {
        root: {
          color: '#333333', // Cor inicial do label
          '&.Mui-focused': { // Cor do label quando o Select está focado
            color: '#3d3935',
          },
        },
      },
    },
    MuiOutlinedInput: { // Para customizar a borda e o texto dentro do Select
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: '#d9d9d9', // Cor da borda
          },
          '&.Mui-focused fieldset': { // Cor da borda quando o Select está focado
            borderColor: '#3d3935',
          },
          '& .MuiInputBase-input': { // Cor do texto dentro do Select
            color: '#3d3935',
          },
        },
      },
    },    
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
          color: '#383830', // Alterado para usar o valor de cor diretamente
          borderColor: '#383830', // Alterado para usar o valor de cor diretamente
        },
      },
    },
  },
});