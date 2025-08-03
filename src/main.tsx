import React from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/global.css';
import App from './App.tsx';
import ErrorBoundary from './components/shared/error/ErrorBoundary.tsx';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from './store/index.ts';
import ThemeProvider from './context/ThemeContext.tsx';

const root = document.getElementById('root');

if (!root) throw new Error('No root Element!');

createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <Provider store={store}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
