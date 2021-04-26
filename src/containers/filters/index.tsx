import React from 'react';
import FiltersComp from '../../components/filters/index';
import { useApplicationContext } from '../../contexts/index';

const Filters: React.FC = () => {
  const {
    genresOptions,
    yearOptions,
    setSelectedGenres,
    setSelectedYears,
    setSearchInputValue,
    isLoading
  } = useApplicationContext();

  return (
    <FiltersComp
      genresOptions={genresOptions}
      yearOptions={yearOptions}
      setSelectedGenres={setSelectedGenres}
      setSelectedYears={setSelectedYears}
      setSearchInputValue={setSearchInputValue}
      isLoading={isLoading}
    />
  )
}

export default Filters;
