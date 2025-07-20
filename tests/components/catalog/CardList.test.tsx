import CardList from '@/components/catalog/CardList';
import type { CardItem, CardProps } from '@/types/types';
import { render, screen } from '@testing-library/react';

const mockedItems = [
  { mal_id: 1, title: 'Card 1', score: 1, images: { webp: { large_image_url: '' } } },
  { mal_id: 2, title: 'Card 2', score: 2, images: { webp: { large_image_url: '' } } },
  { mal_id: 3, title: 'Card 3', score: 3, images: { webp: { large_image_url: '' } } }
] as CardItem[];

jest.mock('@/components/catalog/Card', () => ({
  __esModule: true,
  default: ({ item }: CardProps) => <div>{item.title}</div>
}));

describe('CardList component', () => {
  it('renders cards from props', () => {
    render(<CardList items={mockedItems}></CardList>);

    expect(screen.getByText(/Card 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Card 2/i)).toBeInTheDocument();
    expect(screen.queryByText(/Card 4/i)).toBeNull();
  });
});
