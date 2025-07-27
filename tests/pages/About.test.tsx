import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from '@/pages/About';
import { ROUTES } from '@/types/constants';

describe('About page', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
  });

  it('renders heading', () => {
    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
  });

  it('renders project description', () => {
    expect(
      screen.getByText(/a search platform built with react and powered by the jikan api/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/part of the rs school react 2025q3 course/i)).toBeInTheDocument();
  });

  it('has a link to go back home', () => {
    const link = screen.getByRole('link', { name: /back to home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', ROUTES.Home);
  });
});
