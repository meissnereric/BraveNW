import { createTheme, responsiveFontSizes } from '@material-ui/core';
import '../Fonts/CaslonAntT/CaslonAntT-Regular.ttf';
import '../Fonts/IM_Fell_DW_Pica/IMFellDWPica-Italic.ttf';
import '../Fonts/IM_Fell_DW_Pica/IMFellDWPica-Regular.ttf';

import React from 'react';


const caslon = {
  fontFamily: 'CaslonAntT',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
      local('CaslonAntT-Regular'),
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
} as const;


const pica = {
  fontFamily: 'IMFellDWPica',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('IMFellDWPica-Italic'),
    local('IMFellDWPica-Regular'),
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
} as const;

const fontColor = '#fff'

let theme = createTheme({
  typography: {
    fontFamily: 'CaslonAntT, IMFellDWPica, Arial',
    button: {
      fontFamily: 'CaslonAntT',
    },
    body1: {
      fontFamily: 'IMFelleaDWPica',
      fontStyle: 'italic',
      color: fontColor
    },
    body2: {
      fontFamily: 'IMFelleaDWPica',
      color: fontColor,
      fontSize: '1.2rem'
    },
    h2: {
      fontFamily: 'CaslonAntT',
      color: fontColor
    },
    h3: {
      fontFamily: 'CaslonAntT',
      color: fontColor
    },
    h4: {
      fontFamily: 'CaslonAntT',
      color: fontColor
    },
    h5: {
      fontFamily: 'CaslonAntT',
      color: fontColor
    },
    h6: {
      fontFamily: 'CaslonAntT',
      color: fontColor
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': { 
        '@font-face': [pica],
      },
    },
  },
  palette: {
    primary: {
      light: '#2b2d30',
      main: '#1b1d20',
      dark:  '#0b0d10',
      contrastText: fontColor
    },
    secondary: {
      light: '#2d424a',
      main: '#1d323a',
      dark:  '#0d222a',
      contrastText: fontColor
    }
  }
});

theme = responsiveFontSizes(theme);

class Theming extends React.Component {
  static theme = theme;
}
export default Theming;