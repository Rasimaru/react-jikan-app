import ErrorButton from '@/components/layout/ErrorButton';
import { fireEvent, render, screen } from '@testing-library/react';

describe('ErrorButton component', () => {
  it('throws error after click', () => {
    expect(() => {
      render(<ErrorButton />);

      const errorButton = screen.getByRole('button');
      fireEvent.click(errorButton);
    }).toThrow(/ErrorBoundary check/i);
  });
});
