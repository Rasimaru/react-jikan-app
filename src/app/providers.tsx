'use client';

import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import store from '@/store';
import ThemeProvider from '@/context/ThemeContext';

type ProviderProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProviderProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
};

export default Providers;
