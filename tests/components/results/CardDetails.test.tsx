import { render, screen } from '@testing-library/react';
import { mockItem } from '../../mocks/data/items';
import { MemoryRouter } from 'react-router';
import CardDetails from '@/components/results/CardDetails';

describe('CardDetails component', () => {
  it('renders title, year, image alt and source from props', () => {
    render(
      <MemoryRouter>
        <CardDetails
          card={mockItem}
          isRefreshing={false}
          onRefresh={jest.fn()}
          onClose={jest.fn()}
        ></CardDetails>
      </MemoryRouter>
    );

    expect(screen.getByAltText(/Test Anime/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Anime/i)).toBeInTheDocument();
    expect(screen.getByText(/2025/i)).toBeInTheDocument();
    expect(screen.getByText(/manga/i)).toBeInTheDocument();
  });
});
