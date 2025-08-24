import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './styles/global.css';
import App from './App.tsx';
import { store } from './store/index.ts';

const root = document.getElementById('root');
if (!root) throw new Error('No root Element!');

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
