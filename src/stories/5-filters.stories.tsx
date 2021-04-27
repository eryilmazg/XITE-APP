import FiltersComp from '../components/filters/index';
import { dummyGenreOptions, dummyYearOptions } from '../dummyData/index';
import '../styles/index.scss';

export const Filters = () => (
  <FiltersComp
    setSelectedYears= {(years: number[]) => null}
    setSelectedGenres = {(genres: number[]) => null}
    setSearchInputValue = {(val: string) => null}
    yearOptions={dummyYearOptions}
    genresOptions={dummyGenreOptions}
    isLoading={false}
  />
);

const exportInfo = { title: 'Filters'};
export default exportInfo;
