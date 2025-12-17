declare module '@mui/material/styles' {
  interface Theme {
    palette: {
      common: {
        black: string;
        white: string;
      };
      primary: {
        main: string;
      };
      secondary: {
        main: string;
      };
    };
    typography: {
      tab: {
        textTransform: string;
        fontWeight: string;
        fontSize: string;
      };
      sign: {
        height: string;
        textTransform: string;
        color: string;
      };
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    palette: {
      common: {
        black: string;
        white: string;
      };
      primary: {
        main: string;
      };
      secondary: {
        main: string;
      };
    };
    typography: {
      tab: {
        textTransform: string;
        fontWeight: string;
        fontSize: string;
      };
      sign: {
        height: string;
        textTransform: string;
        color: string;
      };
    };
  }
}
