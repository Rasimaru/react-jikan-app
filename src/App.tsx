import { type JSX } from 'react';
import { Route, Routes } from 'react-router';

import Layout from '@/components/layout/Layout';

import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

import { BASE_PATH } from './types/constants';

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path={BASE_PATH} element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
