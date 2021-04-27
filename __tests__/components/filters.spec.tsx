import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Filters from '../../src/components/filters/index';
import { dummyGenreOptions, dummyYearOptions } from '../../src/dummyData/index';

const renderFilterComponent = (
  setSelectedYears = (years: number[]) => null,
  setSelectedGenres = (genres: number[]) => null,
  setSearchInputValue = (val: string) => null
) => (
  render(
    <Filters
      genresOptions={dummyGenreOptions}
      yearOptions={dummyYearOptions}
      setSelectedGenres={setSelectedGenres}
      setSelectedYears={setSelectedYears}
      setSearchInputValue={setSearchInputValue}
      isLoading={false}
    />
  )
);

const yearOptionControlSelector = '.yearOption__control';
const genreOptionControlSelector = '.genreOption__control';
const yearOptionRemoveButtonsSelector = '.yearOption__multi-value__remove';
const genreOptionRemoveButtonsSelector = '.genreOption__multi-value__remove';

const optionSelectRemoveTest = ({
  controlSelector,
  removeButtonSelector,
  firstOptionToSelect,
  secondOptionToSelect,
  firstValueToCalledWith,
  secondValueToCalledWith,
  thirdValueToCalledWith,
  fourthValueToCalledWith
}: {
  controlSelector: string,
  removeButtonSelector: string,
  firstOptionToSelect: string,
  secondOptionToSelect: string,
  firstValueToCalledWith: number[],
  secondValueToCalledWith: number[],
  thirdValueToCalledWith: number[],
  fourthValueToCalledWith: number[]
}) => {
  const fnMockProp = jest.fn();
  const { getByText } = renderFilterComponent(fnMockProp, fnMockProp);
  const controlElement = document.querySelector(controlSelector) as Element;

  fireEvent.keyDown(controlElement, { key: 'ArrowDown'});
  fireEvent.click(getByText(firstOptionToSelect));
  expect(fnMockProp).toHaveBeenCalledTimes(1);
  expect(fnMockProp).toHaveBeenCalledWith(firstValueToCalledWith);

  fireEvent.keyDown(controlElement, { key: 'ArrowDown'});
  fireEvent.click(getByText(secondOptionToSelect));
  expect(fnMockProp).toHaveBeenCalledTimes(2);
  expect(fnMockProp).toHaveBeenCalledWith(secondValueToCalledWith);

  fnMockProp.mockClear();

  let yearRemoveButtons = document.querySelector(removeButtonSelector) as Element;
  fireEvent.click(yearRemoveButtons);
  expect(fnMockProp).toHaveBeenCalledTimes(1);
  expect(fnMockProp).toHaveBeenCalledWith(thirdValueToCalledWith);

  yearRemoveButtons = document.querySelector(removeButtonSelector) as Element;
  fireEvent.click(yearRemoveButtons);
  expect(fnMockProp).toHaveBeenCalledTimes(2);
  expect(fnMockProp).toHaveBeenCalledWith(fourthValueToCalledWith);
}

it('should show genre and year options when dropdown is open', () => {
  const { getByText } = renderFilterComponent();
  const yearOptionControl = document.querySelector(yearOptionControlSelector) as Element;
  const genreOptionControl = document.querySelector(genreOptionControlSelector) as Element;

  fireEvent.keyDown(yearOptionControl, { key: 'ArrowDown'});
  dummyYearOptions.forEach(({ label }) => {
    getByText(label);
  });

  fireEvent.keyDown(genreOptionControl, { key: 'ArrowDown'});
  dummyGenreOptions.forEach(({ label }) => {
    getByText(label);
  });
});

it('should call setSelectedYears prop with correct data on option selection/remove', () => {
  optionSelectRemoveTest({
    controlSelector: yearOptionControlSelector,
    firstOptionToSelect: '2014',
    secondOptionToSelect: '2013',
    firstValueToCalledWith: [2014],
    secondValueToCalledWith: [2014, 2013],
    removeButtonSelector: yearOptionRemoveButtonsSelector,
    thirdValueToCalledWith: [2013],
    fourthValueToCalledWith: []
  });
});

it('should call setSelectedGenres prop with correct data on option selection/remove', () => {
  optionSelectRemoveTest({
    controlSelector: genreOptionControlSelector,
    firstOptionToSelect: 'Rap/Hip-Hop',
    secondOptionToSelect: 'Rock',
    firstValueToCalledWith: [14],
    secondValueToCalledWith: [14, 8],
    removeButtonSelector: genreOptionRemoveButtonsSelector,
    thirdValueToCalledWith: [8],
    fourthValueToCalledWith: []
  });
});

it('should call setSearchInputValue prop with correct value on input change', () => {
  const setSearchInputValue = jest.fn();
  const { getByPlaceholderText } = renderFilterComponent(setSearchInputValue, setSearchInputValue, setSearchInputValue)
  const inputElement = getByPlaceholderText('Search');

  fireEvent.change(inputElement, { target: { value: 'a' } });
  expect(setSearchInputValue).toHaveBeenCalledTimes(1);
  expect(setSearchInputValue).toHaveBeenCalledWith('a');

  fireEvent.change(inputElement, { target: { value: 'asd' } });
  expect(setSearchInputValue).toHaveBeenCalledTimes(2);
  expect(setSearchInputValue).toHaveBeenCalledWith('asd');
});
