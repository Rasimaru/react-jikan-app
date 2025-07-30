import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '@/components/shared/error/ErrorBoundary';
import ErrorButton from '@/components/shared/error/ErrorButton';

describe('ErrorBoundary component', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it('renders Fallback if there is error', async () => {
    render(
      <ErrorBoundary fallback={<div>Fallback text</div>}>
        <ErrorButton />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Throw Error/i)).toBeInTheDocument();
    await userEvent.click(screen.getByText(/Throw Error/i));

    expect(screen.getByText(/Fallback text/i)).toBeInTheDocument();
  });
});
