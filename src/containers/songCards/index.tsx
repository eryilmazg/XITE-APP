import React from 'react';
import Cards from '../../components/songCards/index';
import { useApplicationContext } from '../../contexts/index';

const SongCards: React.FC<{}> = () =>{ 
  const {
    filteredSongsData
  } = useApplicationContext();

  return (
    <Cards
      data={filteredSongsData}
    />
  )
};

export default SongCards;