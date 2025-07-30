import Fallback from '@/components/shared/error/Fallback';
import { render, screen } from '@testing-library/react';

describe('Fallback component', () => {
  it('renders image, title and text', () => {
    render(<Fallback onReset={jest.fn}></Fallback>);

    expect(screen.getByTestId('mock-lottie')).toBeInTheDocument();
    expect(screen.getByText(/Sorry/i)).toBeInTheDocument();
    expect(screen.getByText(/fixing/i)).toBeInTheDocument();
  });

  it('renders reload button with correct href', () => {
    render(<Fallback onReset={jest.fn} />);

    const reloadButton = screen.getByRole('button');
    expect(reloadButton).toBeInTheDocument();
  });
});
