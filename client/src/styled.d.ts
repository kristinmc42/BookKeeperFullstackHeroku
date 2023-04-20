import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      tertiary: string;
      background: string;
      altBackground: string;
      blackText: string;
      whiteText: string;
      primaryTextColor: string;
      secondaryTextColor: string;
      inputPlaceholder: string;
      darkGrayText: string;
      darkText: string;
      black: string;
      white: string;
      dark: string;
      medium: string;
      light: string;
      danger: string;
      success: string;
      error: string;
    };
    fonts: {
      main: string;
      header: string;
    };
    paddings: {
      container: string;
      pageTop: string;
    };
    margins: {
      pageTop: string;
    };
  }
}
