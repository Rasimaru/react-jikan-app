import Card from '@/components/catalog/Card';
import type { CardItem } from '@/types/types';
import { render, screen } from '@testing-library/react';

const mockedItem = {
  mal_id: 1,
  title: 'Card 1',
  score: 1.25,
  images: {
    webp: {
      large_image_url: 'url'
    }
  },
  year: 2025
} as CardItem;

describe('Card component', () => {
  it('renders title, year, image alt and score from props', () => {
    render(<Card item={mockedItem}></Card>);

    expect(screen.getByAltText(/card 1/i)).toBeInTheDocument();
    expect(screen.getByText(/card 1/i)).toBeInTheDocument();
    expect(screen.getByText(/2025/i)).toBeInTheDocument();
    expect(screen.getByText(/1.25/i)).toBeInTheDocument();
  });

  it('renders "TBD" if year is null', () => {
    render(<Card item={{ ...mockedItem, year: null }}></Card>);

    expect(screen.getByText(/TBD/i)).toBeInTheDocument();
  });
});
