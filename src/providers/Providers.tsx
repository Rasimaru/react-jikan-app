'use client';

import { Provider } from 'react-redux';
import { NextIntlClientProvider } from 'next-intl';
import store from '@/store';
import ErrorBoundary from '@/components/shared/error/ErrorBoundary';
import ThemeProvider from '@/context/ThemeProvider';
import { ProviderProps } from '@/types/types';

const Providers = ({ children, locale, messages }: ProviderProps) => {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Warsaw">
      <ErrorBoundary>
        <Provider store={store}>
          <ThemeProvider>{children}</ThemeProvider>
        </Provider>
      </ErrorBoundary>
    </NextIntlClientProvider>
  );
};

export default Providers;
