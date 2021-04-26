import React from 'react';
import ResponsiveLayout from '../../components/responsiveLayout/index';
import SongCards from '../songCards/index';
import Filters from '../filters/index';
import { useApplicationContext } from '../../contexts/index';

const App: React.FC = () => {
  const {
    isLoading,
    errorMessage
  } = useApplicationContext();
  return (
    <>
    {isLoading && (
      <ResponsiveLayout>...loading</ResponsiveLayout>
    )}
    {errorMessage && (
      <ResponsiveLayout>{errorMessage}</ResponsiveLayout>
    )}
    {!isLoading && !errorMessage && (
      <>
        <Filters />
        <SongCards />
      </>
    )}
    </>
  );
}

export default App;
