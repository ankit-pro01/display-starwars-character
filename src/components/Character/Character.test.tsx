import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';

import Character from './Character';
import mockCharacterData from './__mock__/characterData.json';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate
}));

describe('Character', () => {
  it('Renders Character Component', () => {
    render(
      <BrowserRouter>
        <Character character={mockCharacterData as unknown as Record<string, string>} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
  });

  it('It should navigate to different details page', () => {
    render(
      <BrowserRouter>
        <Character character={mockCharacterData as unknown as Record<string, string>} />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText(/Go to Details/i));
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
  });
});
