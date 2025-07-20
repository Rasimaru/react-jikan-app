import Hero from '@/components/hero/Hero';
import { render, screen } from '@testing-library/react';

describe('Hero component', () => {
  it('renders initial content', () => {
    render(<Hero onSearch={jest.fn()} searchQuery=""></Hero>);

    expect(screen.getByText(/Adventure/i)).toBeInTheDocument();
    expect(screen.getByText(/Track/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
