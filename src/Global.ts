import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'PT Sans', sans-serif;
    min-width: 320px;
    background-color: ${props => props.theme.colors.background};
  }
`;

export default Global;
