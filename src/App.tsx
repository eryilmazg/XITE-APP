import React from 'react';
import ApplicationContextProvider from './contexts/index';
import AppContainer from './containers/App/index';
import './styles/index.scss';

function App() {
  return (
    <ApplicationContextProvider>
      <AppContainer />
    </ApplicationContextProvider>
  );
}

export default App;
