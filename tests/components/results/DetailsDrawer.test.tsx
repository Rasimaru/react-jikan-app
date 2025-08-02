import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import DetailsDrawer from '@/components/results/DetailsDrawer';

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
    const fetchDataIdSpy = jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ data: [] }), { status: 200 }));
    render(
      <MemoryRouter>
        <DetailsDrawer id={59845}></DetailsDrawer>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(fetchDataIdSpy).toHaveBeenCalledWith(expect.stringContaining('59845'));
    });
    expect(screen.getByTestId('overlay')).toBeInTheDocument();
  });

  it('shows error for not found card', async () => {
    const fetchDataIdSpy = jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(
        new Response(JSON.stringify({ message: 'Resource does not exist' }), { status: 404 })
      );
    render(
      <MemoryRouter>
        <DetailsDrawer id={6669999}></DetailsDrawer>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(fetchDataIdSpy).toHaveBeenCalledWith(expect.stringContaining('6669999'));
    });
    expect(screen.getByText(/Resource does not exist/i)).toBeInTheDocument();
  });
});
