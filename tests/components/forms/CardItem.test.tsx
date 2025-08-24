import CardItem, { type ItemProps } from '@/components/forms/CardItem';
import { render, screen } from '@testing-library/react';

describe('CardItem component', () => {
  const itemWithPicture: ItemProps = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    country: 'USA',
    picture: 'https://example.com/pic.jpg'
  };

  const itemWithoutPicture: ItemProps = {
    id: 2,
    name: 'Alice Smith',
    email: 'alice@example.com',
    country: 'UK'
  };

  test('renders item data correctly with picture', () => {
    render(<CardItem item={itemWithPicture} />);

    expect(screen.getByText(/Name: John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Email: john@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Country: USA/i)).toBeInTheDocument();

    const img = screen.getByAltText('preview') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://example.com/pic.jpg');
  });

  test('renders item data correctly without picture', () => {
    render(<CardItem item={itemWithoutPicture} />);

    expect(screen.getByText(/Name: Alice Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/Email: alice@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Country: UK/i)).toBeInTheDocument();

    const img = screen.queryByAltText('preview');
    expect(img).not.toBeInTheDocument();
  });
});
