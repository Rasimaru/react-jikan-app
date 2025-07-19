import Fallback from '@/components/layout/Fallback';
import { BASE_PATH } from '@/types/constants';
import { render, screen } from '@testing-library/react';

jest.mock('@lottiefiles/dotlottie-react', () => ({
  DotLottieReact: () => <div data-testid="mock-lottie"></div>
}));

describe('Fallback component', () => {
  it('renders image, title and text', () => {
    render(<Fallback></Fallback>);

    expect(screen.getByTestId('mock-lottie')).toBeInTheDocument();
    expect(screen.getByText(/Sorry/i)).toBeInTheDocument();
    expect(screen.getByText(/fixing/i)).toBeInTheDocument();
  });

  it('renders reload button with correct href', () => {
    render(<Fallback />);

    const reloadButton = screen.getByRole('button');
    expect(reloadButton).toBeInTheDocument();
    expect(reloadButton).toHaveAttribute('href', BASE_PATH);
  });
});
