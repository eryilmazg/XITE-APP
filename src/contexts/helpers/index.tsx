import { Genre, Option, Video } from '../../types/index';

export const convertGenresToFilterOptions = (genres: Genre[]): Option<number>[] => (
  genres.map(( {id, name }) => ({
    value: id,
    label: name
  }))
);

export const convertVideosToYearOptions = (videos: Video[]): Option<number>[] => (
  videos.map(({ release_year }) => ({
    value: release_year,
    label: release_year.toString()
  }))
);

export const filterSongsBySearchGenreYear = (searchValue: string, genres: number[], years: number[], songsToFilter: Video[]): Video[] => {
  let filteredSongs = songsToFilter;
  if (searchValue) {
    filteredSongs = filteredSongs.filter(({ artist, title }) => (
      artist.toLowerCase().includes(searchValue.toLowerCase()) || title.toLowerCase().includes(searchValue.toLowerCase())
    ));
  }

  if (filteredSongs.length > 0 && (genres.length > 0 || years.length > 0) ) {
    filteredSongs = filteredSongs.filter(({ genre_id, release_year }) => {
      const isGenreMatched = genres.find(g => g === genre_id);
      const isReleaseYearMatched = years.find(y => y === release_year);
      return !!isGenreMatched || !!isReleaseYearMatched 
    })
  }

  return filteredSongs;
}
