import Layout from '@/components/layout/Layout';
import ThemeProvider from '@/context/ThemeContext';
import store from '@/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  NextIntlProvider: ({ children }: { children: React.ReactNode }) => children
}));

jest.mock('next-intl/navigation', () => ({
  createNavigation: () => ({
    Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
      <a href={href}>{children}</a>
    )
  }),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn()
  }),
  usePathname: () => '/',
  useParams: () => ({})
}));

// при необходимости мокнуть next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    pathname: '/',
    push: jest.fn(),
    replace: jest.fn(),
    query: {},
    asPath: '/'
  })
}));

describe('Layout component (Next.js)', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/',
      push: jest.fn(),
      query: {},
      asPath: '/'
    });
  });

  it('renders Header, Footer and children content', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Layout>
            <div>Discover Your Next Adventure</div>
          </Layout>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText(/Jikan/i)).toBeInTheDocument();

    expect(screen.getByText(/Discover Your Next Adventure/i)).toBeInTheDocument();

    expect(screen.getByText(/2025/i)).toBeInTheDocument();
  });
});
