// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#1A3D67',
      },
      secondary: {
        main: '#ffffff',
      },
      text: {
        primary: '#000000',
        secondary: '#ffffff',
      },
      background: {
        default: '#f5f5f5',
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
  });

export default theme;
