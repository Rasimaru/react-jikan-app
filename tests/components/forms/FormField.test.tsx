import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FormField, { type FormOption } from '@/components/forms/FormField';

describe('FormField', () => {
  const mockChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders text input and responds to change', () => {
    render(<FormField label="Name" name="name" type="text" onChangeUncontrolled={mockChange} />);

    const input = screen.getByLabelText(/Name/i) as HTMLInputElement;
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'John' } });
    expect(mockChange).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('John');
  });

  it('toggles password visibility', () => {
    render(
      <FormField
        label="Password"
        name="password"
        type="password"
        onChangeUncontrolled={mockChange}
      />
    );

    const input = screen.getByLabelText('Password') as HTMLInputElement;
    const button = screen.getByRole('button', { name: 'Password visibility switch' });

    expect(input.type).toBe('password');
    fireEvent.click(button);
    expect(input.type).toBe('text');
    fireEvent.click(button);
    expect(input.type).toBe('password');
  });

  it('renders select and responds to change', () => {
    const options: FormOption[] = [
      { value: 'USA', label: 'USA' },
      { value: 'CAN', label: 'Canada' }
    ];

    render(
      <FormField
        label="Country"
        name="country"
        type="select"
        options={options}
        onChangeUncontrolled={mockChange}
      />
    );

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'CAN' } });

    expect(mockChange).toHaveBeenCalledTimes(1);
    expect(select.value).toBe('CAN');
  });

  it('renders checkbox and responds to change', () => {
    render(
      <FormField
        label="Accept Terms"
        name="terms"
        type="checkbox"
        onChangeUncontrolled={mockChange}
      />
    );

    const checkbox = screen.getByLabelText(/Accept Terms/i) as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(mockChange).toHaveBeenCalledTimes(1);
    expect(checkbox.checked).toBe(true);
  });

  it('renders radio buttons and responds to change', () => {
    const options: FormOption[] = [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' }
    ];

    render(
      <FormField
        label="Gender"
        name="gender"
        type="radio"
        options={options}
        onChangeUncontrolled={mockChange}
      />
    );

    const male = screen.getByLabelText('Male') as HTMLInputElement;
    const female = screen.getByLabelText('Female') as HTMLInputElement;

    fireEvent.click(male);
    expect(mockChange).toHaveBeenCalledTimes(1);
    expect(male.checked).toBe(true);
    expect(female.checked).toBe(false);

    fireEvent.click(female);
    expect(mockChange).toHaveBeenCalledTimes(2);
    expect(female.checked).toBe(true);
    expect(male.checked).toBe(false);
  });

  it('renders file input and updates preview', async () => {
    render(
      <FormField label="Picture" name="picture" type="file" onChangeUncontrolled={mockChange} />
    );

    const fileInput = screen.getByLabelText(/Picture/i) as HTMLInputElement;
    const file = new File(['dummy content'], 'photo.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      const img = screen.getByAltText(/File preview/i) as HTMLImageElement;
      expect(img).toBeInTheDocument();
      expect(mockChange).toHaveBeenCalledTimes(2);
    });
  });

  it('renders autocomplete input and datalist', () => {
    const options: FormOption[] = [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' }
    ];

    render(
      <FormField
        label="Fruit"
        name="fruit"
        type="autocomplete"
        options={options}
        onChangeUncontrolled={mockChange}
      />
    );

    const input = screen.getByLabelText(/Fruit/i) as HTMLInputElement;
    expect(screen.getByRole('listbox', { hidden: true })).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'apple' } });
    expect(mockChange).toHaveBeenCalledTimes(1);
  });

  it('shows error message', () => {
    render(<FormField label="Name" name="name" type="text" error="Required" />);

    expect(screen.getByText(/Required/i)).toBeInTheDocument();
  });
});
