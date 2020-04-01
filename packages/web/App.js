import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

//import Routes from './src/routes';
import Container from './src/components/container';
import colors from '../app/src/components/styles/colors';

const App = () => {
  return (
    <Container.Provider>
      <ThemeProvider theme={colors}>
        <BrowserRouter />
      </ThemeProvider>
    </Container.Provider>
  );
};

export default App;
