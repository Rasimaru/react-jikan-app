import Card from '@/components/results/Card';
import { render, screen } from '@testing-library/react';
import { mockItem } from '../../mocks/data/items';
import { MemoryRouter } from 'react-router';

describe('Card component', () => {
  it('renders title, year, image alt and score from props', () => {
    render(
      <MemoryRouter>
        <Card item={mockItem}></Card>
      </MemoryRouter>
    );

    expect(screen.getByAltText(/test/i)).toBeInTheDocument();
    expect(screen.getByText(/test/i)).toBeInTheDocument();
    expect(screen.getByText(/2025/i)).toBeInTheDocument();
    expect(screen.getByText(/1.25/i)).toBeInTheDocument();
  });

  it('renders "TBD" if year is null', () => {
    render(
      <MemoryRouter>
        <Card item={{ ...mockItem, year: null }}></Card>
      </MemoryRouter>
    );

    expect(screen.getByText(/TBD/i)).toBeInTheDocument();
  });
});
