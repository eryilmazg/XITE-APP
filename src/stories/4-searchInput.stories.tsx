import SearchInputComp from '../components/searchInput/index';
import '../styles/index.scss';

export const SearchInput = () => {
  const onChange: (value: string) => void = (value) => {
    return;
  }

  return (
    <SearchInputComp
      onChange={onChange}
    />
  )
}

const exportInfo = { title: 'Search Input'};
export default exportInfo;
