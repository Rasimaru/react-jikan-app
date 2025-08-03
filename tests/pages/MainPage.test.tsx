import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MemoryRouter } from 'react-router';
import MainPage from '@/pages/MainPage';
import { mockItem, mockItems, mockPagination } from '../mocks/data/items';
import { Provider } from 'react-redux';
import store from '@/store';
import SearchResults from '@/components/results/SearchResults';
import Flyout from '@/components/shared/ui/Flyout';

describe('Main page', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('renders on first mount', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <MainPage />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId(/spinner/i)).toBeInTheDocument();
  });

  it('uses localStorage searchQuery on mount', async () => {
    localStorage.setItem('searchQuery', 'Bleach');

    const fetchDataSpy = jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(
        new Response(JSON.stringify({ pagination: mockPagination, data: [] }), { status: 200 })
      );
    render(
      <MemoryRouter>
        <Provider store={store}>
          <MainPage />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(
      () => {
        expect(fetchDataSpy).toHaveBeenCalledWith(expect.stringContaining('q=Bleach'));
      },
      { timeout: 2000 }
    );
  });

  it('updates searchQuery in App when submitting SearchBar and fetching', async () => {
    const fetchDataSpy = jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ pagination: mockPagination, data: [] }), { status: 200 })
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ pagination: mockPagination, data: [mockItem] }), {
          status: 200
        })
      );

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Provider store={store}>
          <MainPage />
        </Provider>
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
        <Provider store={store}>
          <MainPage />
        </Provider>
      </MemoryRouter>
    );

    expect(await screen.findByText(/Network error/i)).toBeInTheDocument();
  });

  it('shows message if no matching items', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(
        new Response(JSON.stringify({ pagination: mockPagination, data: [] }), { status: 200 })
      );
    render(
      <MemoryRouter>
        <Provider store={store}>
          <MainPage />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/nothing found/i)).toBeInTheDocument();
    });
  });

  it('renders Flyout component with checked item', async () => {
    const onPageChange = jest.fn();
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SearchResults
            items={mockItems}
            searchQuery=""
            isLoading={false}
            error={null}
            page={1}
            totalPages={2}
            onPageChange={onPageChange}
          />
          <Flyout></Flyout>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.queryByText(/1 item selected/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId('extender')).not.toBeInTheDocument();

    const checkbox = screen.getAllByRole('checkbox')[0];
    await userEvent.click(checkbox);

    const extender = screen.getByTestId('extender');
    expect(extender).toBeInTheDocument();
    await userEvent.click(extender);

    const remover = screen.getByTestId('remover');
    expect(remover).toBeInTheDocument();
    const downloader = screen.getByTestId('downloader');
    expect(downloader).toBeInTheDocument();
    const shortener = screen.getByTestId('shortener');
    expect(shortener).toBeInTheDocument();
    await userEvent.click(shortener);

    await userEvent.click(remover);
    expect(downloader).not.toBeInTheDocument();

    await userEvent.click(checkbox);
    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
