import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MainPage from '@/app/[locale]/page';
import { Provider } from 'react-redux';
import store from '@/store';
import { server } from 'tests/mocks/server';
import { http } from 'msw';
import SearchResults from '@/components/main/results/SearchResults';
import { mockItems } from 'tests/mocks/data/items';
import Flyout from '@/components/shared/ui/Flyout';

describe('Main page', () => {
  const renderWithProviders = (ui: React.ReactElement) => {
    return render(<Provider store={store}>{ui}</Provider>);
  };

  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders on first mount', () => {
    renderWithProviders(<MainPage />);

    expect(screen.getByTestId(/spinner/i)).toBeInTheDocument();
  });

  it('uses localStorage searchQuery on mount', async () => {
    localStorage.setItem('searchQuery', 'Test');

    const page = await MainPage();
    render(<Provider store={store}>{page}</Provider>);

    await waitFor(
      () => {
        expect(screen.queryByText(/nothing found/i)).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('updates searchQuery in App when submitting SearchBar and fetching', async () => {
    const user = userEvent.setup();
    const router = { push: jest.fn() };
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    jest.spyOn(require('next/navigation'), 'useRouter').mockImplementation(() => router);

    renderWithProviders(<MainPage />);

    const input = screen.getByPlaceholderText(/search for anime or manga/i);
    await user.clear(input);
    await user.type(input, 'test');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(input).toHaveValue('test');
    expect(router.push).toHaveBeenCalledWith('/?q=test');
    expect(await screen.findByText(/test/i)).toBeInTheDocument();
  });

  it('displays error message on fetch failure', async () => {
    // Mock fetch to return error
    server.use(
      http.get('https://api.jikan.moe/v4/top/anime', () => {
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
      })
    );

    renderWithProviders(<MainPage />);
    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });

  it('shows message if no matching items', async () => {
    const user = userEvent.setup();
    renderWithProviders(<MainPage />);

    const input = screen.getByPlaceholderText(/search for anime or manga/i);
    await user.clear(input);
    await user.type(input, 'Bleach');
    await user.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText(/nothing found/i)).toBeInTheDocument();
    });
  });

  it('renders Flyout component with checked item', async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <SearchResults
          items={mockItems}
          searchQuery=""
          isLoading={false}
          isFetching={false}
          error={null}
          page={1}
          totalPages={2}
          onPageChange={jest.fn()}
        />
        <Flyout />
      </Provider>
    );

    expect(screen.queryByText(/1 item selected/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId('extender')).not.toBeInTheDocument();

    const checkbox = screen.getAllByRole('checkbox')[0];
    await user.click(checkbox);

    const extender = screen.getByTestId('extender');
    expect(extender).toBeInTheDocument();
    await user.click(extender);

    const remover = screen.getByTestId('remover');
    expect(remover).toBeInTheDocument();
    const downloader = screen.getByTestId('downloader');
    expect(downloader).toBeInTheDocument();
    const shortener = screen.getByTestId('shortener');
    expect(shortener).toBeInTheDocument();
    await user.click(shortener);

    await user.click(remover);
    expect(downloader).not.toBeInTheDocument();

    await user.click(checkbox);
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
