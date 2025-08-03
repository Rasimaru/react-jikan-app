import Spinner from '@/components/shared/ui/Spinner';
import { render, screen } from '@testing-library/react';

describe('Spinner component', () => {
  it('renders content', () => {
    render(<Spinner />);

    expect(screen.getByTestId(/spinner/i)).toBeInTheDocument();
  });
});
