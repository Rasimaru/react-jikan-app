import NotFoundPage from '@/pages/NotFoundPage';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

describe('NotFound page', () => {
  it('renders on first mount', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Back/i)).toBeInTheDocument();
  });
});
