import SearchBar from '@/components/hero/SearchBar';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('SearchBar component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const onSearchMock = jest.fn();

  it('renders content initial content', () => {
    render(<SearchBar onSearch={onSearchMock} searchQuery="" />);

    expect(screen.getByPlaceholderText(/Search for anime or manga/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onSearch and sets to storage trimmed query on submit', async () => {
    const userAction = userEvent.setup();
    render(<SearchBar onSearch={onSearchMock} searchQuery=""></SearchBar>);

    const input = screen.getByPlaceholderText(/search for anime or manga/i);
    await userAction.clear(input);
    await userAction.type(input, '  Witch  ');
    await userAction.click(screen.getByRole('button'));

    expect(onSearchMock).toHaveBeenCalledWith('Witch');
    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem('searchQuery')).toBe('Witch');
  });
});
