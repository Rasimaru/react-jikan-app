import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import DetailsDrawer from '@/components/results/DetailsDrawer';
import { Provider } from 'react-redux';
import store from '@/store';

describe('Details Drawer component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });
  it('renders details for id', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <DetailsDrawer id={59845}></DetailsDrawer>
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('overlay')).toBeInTheDocument();
    });
  });

  it('shows error for not found card', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <DetailsDrawer id={6669999} />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Resource does not exist/i)).toBeInTheDocument();
    });
  });

  it('aborts render with invalid id', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <DetailsDrawer id={NaN} />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('RefreshBtn')).not.toBeInTheDocument();
    });
  });
});
