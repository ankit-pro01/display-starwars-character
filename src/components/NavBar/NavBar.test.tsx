import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';
import { BrowserRouter } from 'react-router-dom';

//Routing testing is done in Root Component check App.test.tsx

describe('NavBar', () => {
  it('should render NavBar Component', () => {
    const {} = render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
  });

  it('should contains characters link', () => {
    const {} = render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    expect(screen.getByText(/characters/i)).toBeInTheDocument;
  });

  it('should contain Favourities link', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    expect(screen.getByText(/Favourities/i)).toBeInTheDocument;
  });
});
