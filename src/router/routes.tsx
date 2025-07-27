import App from '@/App';
import About from '@/pages/About';
import NotFound from '@/pages/NotFound';
import { ROUTES } from '@/types/constants';
import type { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: ROUTES.Home,
    element: <App />,
    children: [
      {
        path: '',
        element: null
      },
      {
        path: ''
        // element: <ItemDetails />,
      }
    ]
  },
  {
    path: ROUTES.About,
    element: <About />
  },
  {
    path: ROUTES.Page404,
    element: <NotFound />
  }
];
