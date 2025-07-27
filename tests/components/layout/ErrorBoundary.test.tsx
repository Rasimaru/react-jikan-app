import ErrorBoundary from '@/components/layout/ErrorBoundary';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('ErrorBoundary component', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it('renders Fallback if there is error', async () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };
    render(
      <MemoryRouter>
        <ErrorBoundary fallback={<div>Fallback text</div>}>
          <ThrowError />
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(screen.getByText(/Fallback text/i)).toBeInTheDocument();
  });
});
