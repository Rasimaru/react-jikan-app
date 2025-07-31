import CardList from '@/components/results/CardList';
import { render, screen } from '@testing-library/react';
import { mockItems } from '../../mocks/data/items';
import type { CardProps } from '@/types/types';

jest.mock('@/components/results/Card', () => ({
  __esModule: true,
  default: ({ item }: CardProps) => <div>{item.title}</div>
}));

describe('CardList component', () => {
  it('renders cards from props', () => {
    render(<CardList items={mockItems}></CardList>);

    expect(screen.getByText(/Card 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Card 2/i)).toBeInTheDocument();
    expect(screen.queryByText(/Card 4/i)).toBeNull();
  });
});
