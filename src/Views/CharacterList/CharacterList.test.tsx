import { render, screen } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

import { BrowserRouter } from 'react-router-dom';
import CharacterList from './characterList';

window.scrollTo = jest.fn();

describe('CharacterList', () => {
  it('should render CharacterList Component', async () => {
    render(
      <BrowserRouter>
        <CharacterList />
      </BrowserRouter>
    );
  });

  it('should render loader', () => {
    const { container } = render(
      <BrowserRouter>
        <CharacterList />
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
