import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HookForm from '@/components/forms/HookForm';
import { Provider } from 'react-redux';
import { store } from '@/store';

describe('HookForm component', () => {
  it('renders all form fields', () => {
    render(
      <Provider store={store}>
        <HookForm />
      </Provider>
    );

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Male')).toBeInTheDocument();
    expect(screen.getByLabelText('Female')).toBeInTheDocument();
    expect(screen.getByLabelText(/Accept Terms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload Picture/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
  });

  it('calls onSubmit with correct data including base64 picture', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();

    render(
      <Provider store={store}>
        <HookForm onSubmit={mockSubmit} />
      </Provider>
    );

    await user.type(screen.getByLabelText(/Name/i), 'John');
    await user.type(screen.getByLabelText(/Age/i), '25');
    await user.type(screen.getByLabelText(/Email/i), 'john@example.com');
    await user.type(screen.getByLabelText('Password'), '123456Aa!');
    await user.type(screen.getByLabelText('Confirm Password'), '123456Aa!');
    await user.click(screen.getByLabelText('Male'));
    await user.click(screen.getByLabelText(/Accept Terms/i));

    const file = new File(['dummy content'], 'avatar.png', { type: 'image/png' });
    const inputFile = screen.getByLabelText(/Upload Picture/i) as HTMLInputElement;
    await user.upload(inputFile, file);

    const countryInput = screen.getByLabelText(/Country/i) as HTMLInputElement;
    await user.type(countryInput, 'PL');

    const submitBtn = screen.getByRole('button', { name: /submit/i });

    await waitFor(() => {
      expect(submitBtn).not.toBeDisabled();
    });

    await user.click(submitBtn);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(1);
      expect(mockSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'John',
          email: 'john@example.com',
          picture: expect.stringMatching(/^data:image\/png;base64,/),
          country: 'PL'
        })
      );
    });
  });
});
