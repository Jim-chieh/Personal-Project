import { createGlobalStyle } from 'styled-components';
export const ResetStyle = createGlobalStyle`
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

`;

export const GlobalStyle = createGlobalStyle`
html {
  font-family: 'Noto Sans', sans-serif;
  scroll-behavior: smooth;
  min-height: 100%;
  position: relative;
}
`;
