import React from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/global.css';
import App from './App.tsx';
import ErrorBoundary from './components/shared/error/ErrorBoundary.tsx';
import { BrowserRouter } from 'react-router';

const root = document.getElementById('root');

if (!root) throw new Error('No root Element!');

createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
