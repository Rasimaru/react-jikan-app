'use client';

import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import store from '@/store';
import ThemeProvider from '@/context/ThemeContext';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
};

export default Providers;
