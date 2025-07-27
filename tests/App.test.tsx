import App from '@/App';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MemoryRouter } from 'react-router-dom';
import { mockItem } from './mocks/data/items';

describe('App component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders on first mount', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId(/spinner/i)).toBeInTheDocument();
  });

  it('uses localStorage searchQuery on mount', async () => {
    localStorage.setItem('searchQuery', 'Bleach');
    const fetchDataSpy = jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ data: [] }), { status: 200 }));
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(fetchDataSpy).toHaveBeenCalledWith(expect.stringContaining('q=Bleach'));
    });
  });

  it('updates searchQuery in App when submitting SearchBar and fetching', async () => {
    const fetchDataSpy = jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ data: [], pagination: { last_visible_page: 1 } }), {
          status: 200
        })
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ data: [mockItem], pagination: { last_visible_page: 1 } }), {
          status: 200
        })
      );

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/search for anime or manga/i);
    await user.clear(input);
    await user.type(input, 'test');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(input).toHaveValue('test');

    await waitFor(() => {
      expect(fetchDataSpy).toHaveBeenCalledWith(expect.stringContaining('q=test'));
    });

    expect(await screen.findByText(/test/i)).toBeInTheDocument();
  });

  it('displays error message on fetch failure', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(
        new Response(JSON.stringify({ message: 'Network error' }), { status: 500 })
      );
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Network error/i)).toBeInTheDocument();
  });

  it('shows message if no matching items', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ data: [], pagination: { last_visible_page: 1 } }), {
        status: 200
      })
    );
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/nothing found/i)).toBeInTheDocument();
    });
  });
});
