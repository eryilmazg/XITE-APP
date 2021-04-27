import React from 'react';
import { render, screen, RenderResult, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter  from 'axios-mock-adapter';
import ApplicationContextProvider from '../../src/contexts/index';
import App from '../../src/containers/App/index';
import { dummySongs, dummyGenres } from '../../src/dummyData/index';

const mockResponse = {
  genres: dummyGenres,
  videos: dummySongs
}

const yearOptionControlSelector = '.yearOption__control';
const genreOptionControlSelector = '.genreOption__control';

let renderResult: RenderResult;
let mock = new MockAdapter(axios);
const reqUrl = "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json";

const adjustComponent = () => {
  renderResult = render(
    <ApplicationContextProvider>
      <App />
    </ApplicationContextProvider>
  );
};

const adjustPositiveResponse = () => {
  mock.onGet(reqUrl).reply(200, {
    ...mockResponse,
  });
}

it('should render ...loading when waiting response', () => {
  adjustComponent();
  const { getByText } = renderResult;
  getByText('...loading')
});

it('should render Request failed with status code 400 on not messaged error', async() => {
  mock.onGet(reqUrl).reply(400, 'not found');
  adjustComponent();
  await screen.findByText('Request failed with status code 400');
});

it('should render all videos come from api', async() => {
  adjustPositiveResponse();
  adjustComponent();
  const { getByText } = renderResult;
  await screen.findByPlaceholderText('Search');
  dummySongs.forEach(({ title, artist}) => {
    getByText(title);
    getByText(artist);
  });
});

it('filters should work as expected', async() => {
  adjustPositiveResponse();
  adjustComponent();
  const { getByText, queryByText } = renderResult;

  const searchInput = await screen.findByPlaceholderText('Search');
  fireEvent.change(searchInput, { target: { value: 'e' }});

  let expectedVideos = [
    'Pants Velour', 'El Koala', 'Envelop Me',
    'Tom Petty and the Heartbreakers', 'Waka Flocka Flame',
    'John Mayer'
  ];
  expectedVideos.forEach(video => {
    getByText(video);
  });

  const yearControl = document.querySelector(yearOptionControlSelector) as Element;
  fireEvent.keyDown(yearControl, { key: 'ArrowDown'});
  fireEvent.click(getByText('2014'));

  expectedVideos = ['Pants Velour', 'El Koala', 'Envelop Me'];
  expectedVideos.forEach(video => {
    getByText(video);
  });

  const genreControl = document.querySelector(genreOptionControlSelector) as Element;
  fireEvent.keyDown(genreControl, { key: 'ArrowDown'});
  fireEvent.click(getByText('Rock'));

  expectedVideos = ['El Koala'];
  expectedVideos.forEach(video => {
    getByText(video);
  });

  expect(queryByText('Pants Velour')).toBe(null);
});
