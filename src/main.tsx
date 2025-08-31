import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App.tsx';
import Loader from './components/Loader.tsx';

const root = document.getElementById('root');
if (!root) throw new Error('No root Element!');

createRoot(root).render(
  <StrictMode>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </StrictMode>
);
