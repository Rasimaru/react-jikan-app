import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UncontrolledForm from '@/components/forms/UncontrolledForm';
import { useDispatch, useSelector } from 'react-redux';
import * as formSlice from '@/store/formSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

const file = new File(['hello'], 'hello.png', { type: 'image/png' });

describe('UncontrolledForm', () => {
  const mockDispatch = jest.fn();
  const mockOnSubmit = jest.fn();

  const useDispatchMock = useDispatch as unknown as jest.Mock;
  const useSelectorMock = useSelector as unknown as jest.Mock;

  beforeEach(() => {
    useDispatchMock.mockReturnValue(mockDispatch);
    useSelectorMock.mockImplementation((selectorFn) => {
      if (selectorFn === formSlice.selectCountries) {
        return ['USA', 'Canada', 'UK'];
      }
      return [];
    });
    jest.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(<UncontrolledForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Male')).toBeInTheDocument();
    expect(screen.getByLabelText('Female')).toBeInTheDocument();
    expect(screen.getByLabelText('Not sure')).toBeInTheDocument();
    expect(screen.getByLabelText(/Accept Terms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload Picture/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
  });

  it('submits form with correct data with file (base64 picture)', async () => {
    render(<UncontrolledForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: '25' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '123456Aa!' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: '123456Aa!' } });
    fireEvent.click(screen.getByLabelText('Male'));
    fireEvent.click(screen.getByLabelText(/Accept Terms/i));
    fireEvent.change(screen.getByLabelText(/Upload Picture/i), {
      target: { files: [file] }
    });
    fireEvent.change(screen.getByLabelText(/Country/i), { target: { value: 'USA' } });

    fireEvent.submit(screen.getByTestId('uncontrolled-form'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'John',
          email: 'john@example.com',
          country: 'USA',
          picture: expect.stringMatching(/^data:image\/png;base64,/)
        })
      );
    });

    expect(mockDispatch).toHaveBeenCalled();
  });
});
