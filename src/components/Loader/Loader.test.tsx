import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {
  it('should render NavBar Component', () => {
    const { container } = render(<Loader />);
    const loader = container.querySelector('[role="status"]');
    expect(loader).toBeInTheDocument();
  });
});
