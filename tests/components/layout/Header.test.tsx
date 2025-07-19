import Header from '@/components/layout/Header';
import { render, screen } from '@testing-library/react';

jest.mock('@/assets/logo-fox.svg', () => 'mock-logo.svg');

describe('Header component', () => {
  test('renders logo and title', () => {
    render(<Header />);

    expect(screen.getByAltText(/mock-logo.svg/i)).toBeInTheDocument();
    expect(screen.getByText(/Jikan/i)).toBeInTheDocument();
  });

  test('renders ErrorButton', () => {
    render(<Header />);

    expect(screen.getByText(/Throw Error/i)).toBeInTheDocument();
  });
});
