import { render } from '@testing-library/react'
import SongCard from '../../src/components/songCard/index';

it('should render SongCard with img, singer and songName props', () => {
  const { getByText, getByAltText } = render(
    <SongCard 
      img='https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/501437/images/app/w522_h292.jpg'
      singer='Pants Velour'
      songName='All In'
    />
  );

  getByText('Pants Velour');
  getByText('All In');
  getByAltText('All In')
});
