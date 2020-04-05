import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';
import { lighten, darken } from 'polished';

import Routes from './src/routes';
import Container from './src/components/container';
import colors from '../app/src/components/styles/colors';
import Navbar from './src/components/navbar';

const GlobalStyle = createGlobalStyle({
  'html, body': {
    width: '100%',
    height: '100%'
  },
  body: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Roboto, "游ゴシック体", YuGothic, "Yu Gothic Medium", sans-serif',
    background: darken(0.05, '#fff'),
    color: lighten(0.1, '#000'),
    fontSize: '1.15rem'
  },
  a: {
    color: ({ theme: { info } }) => info,
    textDecoration: 'none'
  },
  '*, *:after, *:before': {
    boxSizing: 'border-box',
    // for firefox
    scrollbarWidth: 'thin'
  },
  '::-webkit-scrollbar': {
    width: '6px',
    height: '6px',
    background: ({ theme: { primary } }) => primary,
    '&-thumb': {
      background: ({ theme: { primary } }) => darken(0.3, primary),
      border: 'none'
    }
  }
});

const App = () => {
  return (
    <Container.Provider>
      <ThemeProvider theme={colors}>
        <Normalize />
        <GlobalStyle />
        <BrowserRouter>
          <Navbar />
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
    </Container.Provider>
  );
};

export default App;
