import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

window.scrollTo = jest.fn();

describe('App', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('should navigate to Favourities', async () => {
    render(<App />);
    const user = userEvent.setup();
    // route from homePage to favourites
    expect(screen.getByText(/Favourities/i)).toBeInTheDocument();
    await user.click(screen.getByText(/favourities/i));
    expect(screen.getByText(/FAVOURITIES LIST/i)).toBeInTheDocument();
  });

  it('should navigate to characters', async () => {
    render(<App />);
    const user = userEvent.setup();
    // route from homePage to characters list
    const anchor = screen.getByText('characters', { getParent: 'a' });
    await user.click(anchor);
    window.scrollTo(0, 0);
  });
});
