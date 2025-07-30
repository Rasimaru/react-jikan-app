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
      <ErrorBoundary>
        <ErrorButton />
        <div>Smth here</div>
      </ErrorBoundary>
    );

    expect(screen.getByText(/Throw Error/i)).toBeInTheDocument();
    await userEvent.click(screen.getByText(/Throw Error/i));

    expect(screen.queryByText(/Smth here/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Sorry/i)).toBeInTheDocument();
  });

  it('resets error and reloads changes screen after button click', async () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
        <div>Smth here</div>
      </ErrorBoundary>
    );

    await userEvent.click(screen.getByText(/Throw Error/i));
    await userEvent.click(screen.getByTestId('Error reset'));

    expect(screen.queryByText(/Sorry/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Smth here/i)).toBeInTheDocument();
  });
});
