import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FavouritiesList from './FavouritiesList';
import mockFavouritiesData from './__mock__/favouritiesListData.json';

describe('FavouritiesList', () => {
  it('Renders FavouritiesList Component', () => {
    render(<FavouritiesList listItem={mockFavouritiesData} />);
  });

  describe('FavouritiesList field values ', () => {
    const setup = (label) => {
      const utils = render(<FavouritiesList listItem={mockFavouritiesData} />);
      const input = utils.getByLabelText(label);
      const button = utils.container.querySelector(`#edit-button-${label}`);
      return {
        input,
        button,
        ...utils
      };
    };

    it('Name Input Field should be readonly and  non editable feild', () => {
      const { input } = setup('name');
      expect((input as HTMLInputElement).value).toBe('Jabba Desilijic Tiure');
      expect(input.hasAttribute('readOnly')).toBeTruthy();
    });

    it('HomeWorld Input Field should be readonly and  non editable feild', () => {
      const { input } = setup('homeworld');
      expect((input as HTMLInputElement).value).toBe('Nal Hutta');
      expect(input.hasAttribute('readOnly')).toBeTruthy();
    });

    it('Height Input Field can be editable', () => {
      const { input, button } = setup('height');
      expect((input as HTMLInputElement).value).toBe('175');
      expect(input.hasAttribute('readOnly')).toBeTruthy();
      fireEvent.click(button); // after clicking the edit button it should make feild editable
      expect(input.hasAttribute('readOnly')).toBeFalsy();
    });

    it('Gender Input Field can be editable', () => {
      const { input, button } = setup('gender');
      expect((input as HTMLInputElement).value).toBe('hermaphrodite');
      expect(input.hasAttribute('readOnly')).toBeTruthy();
      fireEvent.click(button); // after clicking the edit button it should make feild editable
      expect(input.hasAttribute('readOnly')).toBeFalsy();
    });
  });
});
