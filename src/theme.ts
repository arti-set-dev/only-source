declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      blue: string;
      fuschia100: string;
      iris100: string;
      white: string;
      line: string;
    };
    variables: {
      contentWidth: string;
      containerOffset: string;
      containerWidth: string;
      duration: number;
    };
  }
}

const theme = {
  colors: {
    background: '#f4f5f9',
    primary: '#42567a',
    secondary: '#42567a',
    blue: '#3877ee',
    fuschia100: '#ef5da8',
    iris100: '#5d5fef',
    white: '#ffffff',
    line: '#d7d9e0',
  },
  variables: {
    contentWidth: '1440px',
    containerOffset: '15px',
    containerWidth: `calc(1440px + (15px * 2))`,
    duration: 0.8,
  },
};

export default theme;
