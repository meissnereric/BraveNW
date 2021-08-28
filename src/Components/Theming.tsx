import { createTheme, responsiveFontSizes} from '@material-ui/core';
import  '../Fonts/CaslonAntT.ttf';
import  '../Fonts/IM_Fell_DW_Pica/IMFellDWPica-Italic.ttf';
import  '../Fonts/IM_Fell_DW_Pica/IMFellDWPica-Regular.ttf';

import React from 'react';


const carlson = {
  fontFamily: 'CarlsonAntT',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
      local('CaslonAntT'),
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

let theme = createTheme({
    // typography: {
    //     fontFamily: 'CaslonAntT',
    //   },
    //   overrides: {
    //     MuiCssBaseline: {
    //       '@global': {
    //         '@font-face': [pica],
    //       },
    //     },
    //   },
    palette: {
      primary: {
        light: '#7986cb',
        main:  '#3f51b5',
        dark:  '#303f9f',
        contrastText: '#fff'
      }
    }
  });

  theme = responsiveFontSizes(theme);

  class Theming extends React.Component {
    static theme = theme;
  }
  export default Theming;