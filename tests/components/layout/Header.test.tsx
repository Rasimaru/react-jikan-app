import Header from '@/components/layout/Header';
import ThemeProvider from '@/context/ThemeContext';
import store from '@/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  NextIntlProvider: ({ children }: { children: React.ReactNode }) => children
}));

jest.mock('next-intl/navigation', () => ({
  createNavigation: () => ({
    Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>
  })
}));

describe('Header component', () => {
  test('renders logo and title', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByAltText(/Jikan logo/i)).toBeInTheDocument();

    expect(screen.getByText(/Jikan/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
  });
});
