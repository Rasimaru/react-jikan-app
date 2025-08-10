import SearchBar from '@/components/search/SearchBar';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('SearchBar component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(console, 'error').mockImplementation(() => {});
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

    const input = screen.getByRole('searchbox');
    await userAction.clear(input);
    await userAction.type(input, '  Witch  ');
    await userAction.click(screen.getByRole('button'));

    expect(onSearchMock).toHaveBeenCalledWith('Witch');
    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem('searchQuery')).toBe(JSON.stringify('Witch'));
  });

  it('handles error when reading from localStorage', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error(`Can't read value from local storage`);
    });

    render(<SearchBar onSearch={onSearchMock} searchQuery="initial"></SearchBar>);

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("Can't read value from local storage"),
      expect.any(Error)
    );
  });

  it('handles error when setting to localStorage', async () => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error(`Can't set value to local storage`);
    });

    render(<SearchBar onSearch={onSearchMock} searchQuery="initial"></SearchBar>);

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("Can't set value to local storage"),
      expect.any(Error)
    );
  });
});
