import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import * as data from '../../Utils/util';
import Favourities from './Favourities';
import mockFavouritiesData from './__mock__/FavouritiesData.json';

describe('Favourities', () => {
  it('should render Favourities Component', async () => {
    render(
      <BrowserRouter>
        <Favourities />
      </BrowserRouter>
    );
    expect(await screen.findByText(/FAVOURITIES LIST/)).toBeInTheDocument();
  });

  it('should render FavouritiesList is empty ', async () => {
    render(
      <BrowserRouter>
        <Favourities />
      </BrowserRouter>
    );
    expect(await screen.findByText(/Hi there! Your FavouritiesList is empty./)).toBeInTheDocument();
  });

  it('should render Favourities List', () => {
    const mock = jest.spyOn(data, 'getFavouritiesList').mockResolvedValue(mockFavouritiesData);
    render(
      <BrowserRouter>
        <Favourities />
      </BrowserRouter>
    );
    expect(mock).toHaveBeenCalledTimes(1);
    mock.mockRestore();
  });
});
