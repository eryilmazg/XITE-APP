import { render } from '@testing-library/react'
import Cards from '../../src/components/songCards/index';
import { dummySongs } from '../../src/dummyData/index';

it('should render SongCard components with the given data', () => {
  const { getByText, getByAltText } = render(
    <Cards
      data={dummySongs}
    />
  );

  dummySongs.forEach(({ title, artist }) => {
    getByText(artist);
    getByText(title);
    getByAltText(title);
  });
});

it('should No songs to show text on data empty array', () => {
  const { getByText,  } = render(
    <Cards
      data={[]}
    />
  );

  getByText('No songs to show');
});
