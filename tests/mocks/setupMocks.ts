import './externals/assets';
import './externals/dotlottie';

import './data/items';
import './data/responses';

import '@testing-library/jest-dom';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    pathname: '/'
  }),
  notFound: jest.fn(),
  usePathname: jest.fn(() => '/')
}));
