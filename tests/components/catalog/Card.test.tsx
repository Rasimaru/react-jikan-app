import Card from '@/components/catalog/Card';
import { render, screen } from '@testing-library/react';
import { mockItem } from '../../mocks/data/items';

describe('Card component', () => {
  it('renders title, year, image alt and score from props', () => {
    render(<Card item={mockItem}></Card>);

    expect(screen.getByAltText(/test/i)).toBeInTheDocument();
    expect(screen.getByText(/test/i)).toBeInTheDocument();
    expect(screen.getByText(/2025/i)).toBeInTheDocument();
    expect(screen.getByText(/1.25/i)).toBeInTheDocument();
  });

  it('renders "TBD" if year is null', () => {
    render(<Card item={{ ...mockItem, year: null }}></Card>);

    expect(screen.getByText(/TBD/i)).toBeInTheDocument();
  });
});
