import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import SearchComponent from './SearchComponent';

const mockedFunction = jest.fn();

describe('SearchComponent', () => {
  const setup = () => {
    const utils = render(<SearchComponent filterCharacterList={mockedFunction} />);
    const input = utils.getByLabelText('Search');
    return {
      input,
      ...utils
    };
  };

  it('should render Search Component', () => {
    render(<SearchComponent filterCharacterList={mockedFunction} />);
  });

  it('should be editable', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: 'Luke' } });
    expect((input as HTMLInputElement).value).toBe('Luke');
  });
});
