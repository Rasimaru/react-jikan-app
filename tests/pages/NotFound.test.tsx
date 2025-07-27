import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import { ROUTES } from '@/types/constants';

describe('NotFound page', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
  });

  it('renders 404 heading', () => {
    expect(screen.getByRole('heading', { name: /404/i })).toBeInTheDocument();
  });

  it('renders not found message', () => {
    expect(screen.getByText(/the page you are looking for does not exist/i)).toBeInTheDocument();
  });

  it('has a link to go back home', () => {
    const link = screen.getByRole('link', { name: /back to home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', ROUTES.Home);
  });
});
