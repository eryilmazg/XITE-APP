import React, { Dispatch } from 'react';
import Select from 'react-select';
import SearchInput from '../../components/searchInput';
import { Option } from '../../types/index';

interface Props {
  genresOptions: Option<number>[],
  yearOptions: Option<number>[],
  setSelectedGenres: Dispatch<number[]>,
  setSelectedYears: Dispatch<number[]>,
  setSearchInputValue: Dispatch<string>,
  isLoading: boolean
}

const Filters: React.FC<Props> = ({
  genresOptions,
  yearOptions,
  setSelectedGenres,
  setSelectedYears,
  setSearchInputValue,
  isLoading
}) => {

  const normalizeSelectedData = (data: Option<number>[]): number[] => (
    data.map(({ value }) => value)
  );

  return (
    !isLoading ? (
      <div className="filter">
        <SearchInput
          onChange={setSearchInputValue}
        />
        <div className="filter-select">
          <div className="filter-select-container">
            {genresOptions.length > 0 && (
              <Select
                classNamePrefix='genreOption'
                options={genresOptions}
                isMulti={true}
                placeholder='Genres'
                onChange={(data) => setSelectedGenres(normalizeSelectedData(data as Option<number>[]))}
              />
            )}
          </div>
          <div className="filter-select-container">
            {yearOptions.length > 0 && (
              <Select
                classNamePrefix='yearOption'
                options={yearOptions}
                isMulti={true}
                placeholder='Release year'
                onChange={(data) => setSelectedYears(normalizeSelectedData(data as Option<number>[]))}
              />
            )}
          </div>
        </div>
      </div>
    ) : null
  )
}

export default Filters;
