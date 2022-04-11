import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CharacterDetails from './CharacterDetails';

window.scrollTo = jest.fn();

describe('CharacterDetails', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render CharacterDetails Component', async () => {
    render(
      <BrowserRouter>
        <CharacterDetails />
      </BrowserRouter>
    );
  });

  it('should render loader', () => {
    const { container } = render(
      <BrowserRouter>
        <CharacterDetails />
      </BrowserRouter>
    );
    jest.mock('../../Utils/useFetch', () => {
      return jest.fn(() => ({
        loading: true,
        isError: false,
        data: []
      }));
    });

    const loader = container.querySelector('[role="status"]');
    expect(loader).toBeInTheDocument();
  });
});
