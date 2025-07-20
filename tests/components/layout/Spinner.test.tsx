import Spinner from '@/components/layout/Spinner';
import { render, screen } from '@testing-library/react';

describe('Spinner component', () => {
  it('renders content', () => {
    render(<Spinner />);

    expect(screen.getByTestId(/spinner/i)).toBeInTheDocument();
  });
});
