import CardDetails from '@/components/catalog/CardDetails';
import { render, screen, waitFor, fireEvent, act, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockItem = {
  title: 'Test Title',
  duration: '24 min',
  source: 'Manga',
  year: 2025,
  synopsis: 'Test synopsis',
  score: 1.25,
  images: {
    webp: {
      large_image_url: 'https://test.com/image.webp'
    }
  }
};

describe('CardDetails', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: mockItem })
      } as Response)
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.resetAllMocks();
    cleanup();
  });

  it('renders spinner initially', async () => {
    await act(async () => {
      render(<CardDetails id={1} onClose={jest.fn()} />);
    });
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('fetches and displays item data', async () => {
    await act(async () => {
      render(<CardDetails id={1} onClose={jest.fn()} />);
    });

    await act(async () => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(screen.getByText(/Test Title/i)).toBeInTheDocument();
      expect(screen.getByText(/Duration:/i)).toBeInTheDocument();
      expect(screen.getByText(/24 min/i)).toBeInTheDocument();
      expect(screen.getByText(/Manga/i)).toBeInTheDocument();
      expect(screen.getByText(/2025/i)).toBeInTheDocument();
      expect(screen.getByText(/Test synopsis/i)).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('src', mockItem.images.webp.large_image_url);
    });
  });

  it('calls onClose when clicking on overlay and Close button', async () => {
    const onCloseMock = jest.fn();

    await act(async () => {
      render(<CardDetails id={1} onClose={onCloseMock} />);
    });

    await act(async () => {
      jest.runAllTimers();
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId('overlay'));
      jest.advanceTimersByTime(300);
    });

    await waitFor(
      () => {
        expect(onCloseMock).toHaveBeenCalledTimes(1);
      },
      { timeout: 2000 }
    );

    cleanup();

    await act(async () => {
      render(<CardDetails id={1} onClose={onCloseMock} />);
    });

    await act(async () => {
      jest.runAllTimers();
    });

    const closeButton = screen.getByText(/close/i);
    await act(async () => {
      await userEvent.click(closeButton);
      jest.advanceTimersByTime(300);
    });

    await waitFor(
      () => {
        expect(onCloseMock).toHaveBeenCalledTimes(2);
      },
      { timeout: 2000 }
    );
  });
});
