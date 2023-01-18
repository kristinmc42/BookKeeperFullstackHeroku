import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
*,
*::before,
::after {
    box-sozing: border-box;
    margin: 0;
    padding: 0;
}

html{
    font-size: 125%;
}

body{
    width: 100%;
    text-rendering: optimizeSpeed;
    font-family: ${(props) => props.theme.fonts.main}, sans-serif;
    font-size: 1rem;
    line-height: 1;
    color: ${(props) => props.theme.colors.whiteText};
    background-color: ${(props) => props.theme.colors.background};
}
ul{
    list-style: none;
}
li{
    list-style-type: none;
}
img{
    max-width: 100%;
    display: block;
}
input,button, textarea, select {
    font: inherit;
}
a{
    text-decoration: none;
}
`;
