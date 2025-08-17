import { render, screen } from '@testing-library/react';
import { mockItem } from '../../mocks/data/items';
import { Provider } from 'react-redux';
import store from '@/store';
import userEvent from '@testing-library/user-event';
import Card from '@/components/main/results/Card';
import React from 'react';

jest.mock('next/image', () => {
  const MockImage = ({ src, alt, ...props }: { src: string; alt: string }) => {
    const fixedSrc = src.startsWith('/') || src.startsWith('http') ? src : `/${src}`;
    return <img src={fixedSrc} alt={alt} {...props} />;
  };
  MockImage.displayName = 'MockImage';
  return MockImage;
});

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
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn() }),
  usePathname: () => '/',
  useParams: () => ({}),
  useSearchParams: () => new URLSearchParams()
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    pathname: '/',
    push: jest.fn(),
    replace: jest.fn(),
    query: {},
    asPath: '/'
  }),
  useSearchParams: () => new URLSearchParams()
}));

describe('Card component', () => {
  it('renders title, year, image alt and score from props', () => {
    render(
      <Provider store={store}>
        <Card item={mockItem} />
      </Provider>
    );

    expect(screen.getByAltText(/test/i)).toBeInTheDocument();
    expect(screen.getByText(/test/i)).toBeInTheDocument();
    expect(screen.getByText(/2025/i)).toBeInTheDocument();
    expect(screen.getByText(/1.25/i)).toBeInTheDocument();
  });

  it('renders "TBD" if year is null', () => {
    render(
      <Provider store={store}>
        <Card item={{ ...mockItem, year: null }} />
      </Provider>
    );

    expect(screen.getByText(/TBD/i)).toBeInTheDocument();
  });

  it('changes checked state on click', async () => {
    render(
      <Provider store={store}>
        <Card item={mockItem} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);

    expect(screen.getByText(/selected/i)).toBeInTheDocument();
    expect(screen.getByTestId(/CheckedIcon/i)).toBeInTheDocument();
  });
});
