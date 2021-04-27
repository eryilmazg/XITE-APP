import React, {
  createContext, useContext, useState, useEffect, useMemo, Dispatch
} from 'react';
import { getSongInfo } from '../api/index';
import { Video, Genre, Option } from '../types/index';
import { convertGenresToFilterOptions, convertVideosToYearOptions, filterSongsBySearchGenreYear } from './helpers/index';

interface ContextType {
  filteredSongsData: Video[],
  errorMessage: string,
  allGenres: Genre[],
  genresOptions: Option<number>[],
  yearOptions: Option<number>[],
  setSelectedGenres: Dispatch<number[]>,
  setSelectedYears: Dispatch<number[]>,
  setSearchInputValue: Dispatch<string>,
  isLoading: boolean
}

const ApplicationContext = createContext({});
export const useApplicationContext = () => useContext(ApplicationContext) as ContextType;

interface Props {
  children: React.ReactNode
}

const ApplicationContextProvider: React.FC<Props> = ({
  children
}) => {
  const [allSongsData, setAllSongsData] = useState<Video[]>([]);
  const [filteredSongsData, setFilteredSongsData] = useState<Video[]>([]);
  const [allGenres, setAllGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    try {
      const getSongs = async () => {
        const response = await getSongInfo();
        const videos = response.data.videos;
        const genres = response.data.genres;
        setAllSongsData(videos);
        setFilteredSongsData(videos);
        setAllGenres(genres);
        setIsLoading(false);
      };

      getSongs();
    } catch(e) {
      if (e?.message) {
        setErrorMessage(e.message);
        setIsLoading(false);
        return;
      }
      setErrorMessage('Unexpected error occured, please try again.');
      setIsLoading(false);
    }
  }, [])

  useEffect(() => {
    const filteredSongs = filterSongsBySearchGenreYear(searchInputValue, selectedGenres, selectedYears, allSongsData);
    setFilteredSongsData(filteredSongs);
  }, [searchInputValue, selectedGenres, selectedYears]);

  const genresOptions = useMemo(() => {
    if (allGenres.length !== 0) {
      return convertGenresToFilterOptions(allGenres);
    }

    return [];
  }, [allGenres]);

  const yearOptions = useMemo(() => {
    if (allSongsData.length !== 0) {
      return convertVideosToYearOptions(allSongsData);
    }

    return [];
  }, [allSongsData]);

  const value = {
    filteredSongsData,
    errorMessage,
    allGenres,
    genresOptions,
    yearOptions,
    setSelectedGenres,
    setSelectedYears,
    setSearchInputValue,
    isLoading
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  )
};

export default ApplicationContextProvider;
