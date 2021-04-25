import Cards from '../components/songCards/index';
import { dummySongs } from '../dummyData/index';
import '../styles/index.scss';

export const SongCards = () => (
  <Cards
    data={dummySongs}
  />
);

const exportInfo = { title: 'Song Cards'};
export default exportInfo;
