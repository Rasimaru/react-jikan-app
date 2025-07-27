import Header from '@/components/layout/Header';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Header component', () => {
  test('renders logo and title', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByAltText(/mock-logo.svg/i)).toBeInTheDocument();
    expect(screen.getByText(/Jikan/i)).toBeInTheDocument();
  });

  test('renders navigation link to About page', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });
});
