import React from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/global.css';
import ErrorBoundary from './components/layout/ErrorBoundary.tsx';
import Fallback from './components/layout/Fallback.tsx';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { routes } from './router/routes.tsx';

const root = document.getElementById('root');
export const RouterWrapper = () => useRoutes(routes);

if (!root) throw new Error('No root Element!');

createRoot(root).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<Fallback></Fallback>}>
      <BrowserRouter>
        <RouterWrapper />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
