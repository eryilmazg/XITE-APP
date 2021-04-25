import React, { useState } from 'react';

interface Props {
  onChange: (value: string) => void,
  placeholder?: string
}

const SearchInput: React.FC<Props> = ({
  onChange,
  placeholder='search'
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onChange(value);
  };

  return (
    <div>
      <input
        placeholder={placeholder}
        className='primary-input'
        type='text'
        onChange={handleOnChange}
        value={inputValue}
      />
        
    </div>
  )
};

export default SearchInput;
