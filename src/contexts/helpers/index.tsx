import { Genre, Option, Video } from '../../types/index';

export const convertGenresToFilterOptions = (genres: Genre[]): Option<number>[] => (
  genres.map(({id, name }) => ({
    value: id,
    label: name
  }))
);

export const convertVideosToYearOptions = (videos: Video[]): Option<number>[] => {
  let uniqueYears: number[] = [];
  videos.forEach(({ release_year }) => {
    if (!uniqueYears.includes(release_year)) {
      uniqueYears.push(release_year);
    }
  })
  uniqueYears = uniqueYears.sort().reverse();
  return uniqueYears.map(( release_year ) => ({
    value: release_year,
    label: release_year.toString()
  }))
};

export const filterSongsBySearchGenreYear = (searchValue: string, genres: number[], years: number[], songsToFilter: Video[]): Video[] => {
  let filteredSongs = songsToFilter;
  if (searchValue) {
    filteredSongs = filteredSongs.filter(({ artist, title }) => (
      artist.toLowerCase().includes(searchValue.toLowerCase()) || title.toString().toLowerCase().includes(searchValue.toLowerCase())
    ));
  }

  if (filteredSongs.length > 0 && (genres.length > 0 || years.length > 0) ) {
    filteredSongs = filteredSongs.filter(({ genre_id, release_year }) => {
      const isGenreMatched = genres.find(g => g === genre_id);
      const isReleaseYearMatched = years.find(y => y === release_year);
      return (genres.length === 0 || !!isGenreMatched) && (years.length === 0 || !!isReleaseYearMatched )
    })
  }

  return filteredSongs;
};
