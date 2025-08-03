import Search from '@/components/search/Search';
import { render, screen } from '@testing-library/react';

describe('Hero component', () => {
  it('renders initial content', () => {
    render(<Search onSearch={jest.fn()} searchQuery="" />);

    expect(screen.getByText(/Adventure/i)).toBeInTheDocument();
    expect(screen.getByText(/Track/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
