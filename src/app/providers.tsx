'use client';

import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import store from '@/store';
import ThemeProvider from '@/context/ThemeContext';
import ErrorBoundary from '@/components/shared/error/ErrorBoundary';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default Providers;
