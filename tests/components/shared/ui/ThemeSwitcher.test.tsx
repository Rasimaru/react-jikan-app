import ThemeSwitcher from '@/components/shared/ui/ThemeSwitcher';
import store from '@/store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

describe('Theme switcher component', () => {
  it('renders switcher button', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ThemeSwitcher />
        </Provider>
      </MemoryRouter>
    );

    const switcher = screen.getByTestId('themeSwitch');
    expect(switcher).toBeInTheDocument();
    await userEvent.click(switcher);
    expect(screen.getByText(/auto/i)).toBeInTheDocument();

    const lightswitcher = screen.getByTestId('lightswitcher');
    await userEvent.click(lightswitcher);
    expect(screen.getByTestId('themeSwitch')).toHaveAttribute('name', 'light');
  });
});
