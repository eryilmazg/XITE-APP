import Card from '../components/songCard/index';
import '../styles/card.scss';

export const SongCard = () => (
  <Card 
    image_url='https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/501437/images/app/w522_h292.jpg'
    artist='Pants Velour'
    title='All In'
  />
);

const exportInfo = { title: 'Song Card'};
export default exportInfo;