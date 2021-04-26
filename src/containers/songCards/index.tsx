import React from 'react';
import ResponsiveLayout from '../../components/responsiveLayout';
import Cards from '../../components/songCards/index';
import { useApplicationContext } from '../../contexts/index';

const SongCards: React.FC<{}> = () =>{ 
  const {
    filteredSongsData,
    isLoading
  } = useApplicationContext();

  return (
    isLoading ? (
      <ResponsiveLayout>...loading</ResponsiveLayout>
    )
    : (
      <Cards
        data={filteredSongsData}
      />
    )
  )
};

export default SongCards;