'use client';

import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import store from '@/store';

import ErrorBoundary from '@/components/shared/error/ErrorBoundary';
import { NextIntlClientProvider } from 'next-intl';
import ThemeProvider from '@/context/ThemeProvider';

type ProviderProps = {
  children: ReactNode;
  locale: string;
  messages: Record<string, string>;
};

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
