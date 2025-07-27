import React from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/global.css';
import App from './App.tsx';
import ErrorBoundary from './components/layout/ErrorBoundary.tsx';
import Fallback from './components/layout/Fallback.tsx';
import { BrowserRouter } from 'react-router-dom';

const root = document.getElementById('root');

if (!root) throw new Error('No root Element!');

createRoot(root).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<Fallback></Fallback>}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
