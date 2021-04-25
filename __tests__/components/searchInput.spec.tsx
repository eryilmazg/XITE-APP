import { render, fireEvent, screen } from '@testing-library/react'
import SearchInput from '../../src/components/searchInput/index';

const onChange = (value: string) => { return; }

function hasInputValue(e: Element, inputValue: string) {
  return screen.getByDisplayValue(inputValue) === e
}

it('should render given placeholder', () => {
  const { getByPlaceholderText } = render(
    <SearchInput 
      onChange={onChange}
      placeholder='hello friend'
    />
  );
  
  getByPlaceholderText('hello friend');
});

it('should change value when input changed', () => {
  const { getByPlaceholderText } = render(
    <SearchInput 
      onChange={onChange}
      placeholder='hello friend'
    />
  );
  const input = getByPlaceholderText('hello friend');
  fireEvent.change(input, { target: { value: 'a' } });
  expect(hasInputValue(input, "a")).toBe(true)
  fireEvent.change(input, { target: { value: 'asd' } });
  expect(hasInputValue(input, "asd")).toBe(true)
});

it('should call onChange prop with correct arguments', () => {
  const onChange = jest.fn();

  const { getByPlaceholderText } = render(
    <SearchInput 
      onChange={onChange}
      placeholder='hello friend'
    />
  );
  const input = getByPlaceholderText('hello friend');
  fireEvent.change(input, { target: { value: 'a' } });
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith('a');

  fireEvent.change(input, { target: { value: 'asd' } });
  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onChange).toHaveBeenCalledWith('asd');
});
