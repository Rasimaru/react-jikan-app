import Header from '@/components/layout/Header';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

describe('Header component', () => {
  test('renders logo and title', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByAltText(/Jikan logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Jikan/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
  });
});
