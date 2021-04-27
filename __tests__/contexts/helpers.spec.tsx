import { dummyGenreOptions, dummyYearOptions, dummySongs, dummyGenres } from '../../src/dummyData/index';
import { convertGenresToFilterOptions, convertVideosToYearOptions, filterSongsBySearchGenreYear } from '../../src/contexts/helpers/index';

it('convertGenresToFilterOptions should covert genre array to filter options that have value and label', () => {
  const convertedGenreOptions = convertGenresToFilterOptions(dummyGenres);
  expect(convertedGenreOptions).toEqual(dummyGenreOptions);
});

it('convertVideosToYearOptions should covert video array to filter options that have value and label new to old', () => {
  const convertedVideoOptions = convertVideosToYearOptions(dummySongs);
  expect(convertedVideoOptions).toEqual(dummyYearOptions);
});

it('convertVideosToYearOptions should not consist of duplicate years', () => {
  const optionsWithDuplicateYear = [...dummyYearOptions, { value: 2014, label: '2014' }]
  const convertedVideoOptions = convertVideosToYearOptions(dummySongs);
  expect(convertedVideoOptions).not.toEqual(optionsWithDuplicateYear);
});

it('filterSongsBySearchGenreYear should filter with only searchValue by artist and title', () => {
  const expectedResults = [
    [dummySongs[1]],
    [
      dummySongs[0],
      dummySongs[1],
      dummySongs[4]
    ]
  ];

  let filteredSongs = filterSongsBySearchGenreYear('El Koala', [], [], dummySongs);
  expect(filteredSongs).toEqual(expectedResults[0]);

  filteredSongs = filterSongsBySearchGenreYear('Veni paca to', [], [], dummySongs);
  expect(filteredSongs).toEqual(expectedResults[0]);

  filteredSongs = filterSongsBySearchGenreYear('el', [], [], dummySongs);
  expect(filteredSongs).toEqual(expectedResults[1]);
});

it('filterSongsBySearchGenreYear should filter with only genres', () => {
  const expectedResults = [
    [
      dummySongs[1],
      dummySongs[2]
    ],
    [
      dummySongs[0],
      dummySongs[1],
      dummySongs[2],
      dummySongs[4]
    ]
  ];

  let filteredSongs = filterSongsBySearchGenreYear('', [8], [], dummySongs);
  expect(filteredSongs).toEqual(expectedResults[0]);

  filteredSongs = filterSongsBySearchGenreYear('', [8, 14, 45], [], dummySongs);
  expect(filteredSongs).toEqual(expectedResults[1]);
});

it('filterSongsBySearchGenreYear should filter with only years', () => {
  const expectedResults = [
    [
      dummySongs[0],
      dummySongs[1],
      dummySongs[4],
    ],
    [
      dummySongs[0],
      dummySongs[1],
      dummySongs[2],
      dummySongs[4]
    ]
  ];

  let filteredSongs = filterSongsBySearchGenreYear('', [], [2014], dummySongs);
  expect(filteredSongs).toEqual(expectedResults[0]);

  filteredSongs = filterSongsBySearchGenreYear('', [], [2014, 2010], dummySongs);
  expect(filteredSongs).toEqual(expectedResults[1]);
});

it('filterSongsBySearchGenreYear should filter by all params', () => {
  const expectedResults = [
    [
      dummySongs[1],
    ],
    [
      dummySongs[3],
    ],
  ];

  let filteredSongs = filterSongsBySearchGenreYear('ko', [8, 14], [2014], dummySongs);
  expect(filteredSongs).toEqual(expectedResults[0]);

  filteredSongs = filterSongsBySearchGenreYear('Waka', [6, 8, 14], [2013, 2014, 2011], dummySongs);
  expect(filteredSongs).toEqual(expectedResults[1]);

  filteredSongs = filterSongsBySearchGenreYear('empty', [8, 14], [2013, 2014], dummySongs);
  expect(filteredSongs).toEqual([]);
});
