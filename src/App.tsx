import React from 'react';
import ApplicationContextProvider from './contexts/index';
import SongCards from './containers/songCards/index';
import Filters from './containers/filters/index';
import './styles/index.scss';

function App() {
  return (
    <ApplicationContextProvider>
      <Filters />
      <SongCards />
    </ApplicationContextProvider>
  );
}

export default App;
