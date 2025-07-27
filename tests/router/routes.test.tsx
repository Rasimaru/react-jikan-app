import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from '@/types/constants';
import { routes } from '@/router/routes';
import NotFound from '@/pages/NotFound';

describe('App routing', () => {
  it('renders App component on home route', () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.Home]}>
        <Routes>
          {routes.map((route, i) => (
            <Route key={i} path={route.path} element={route.element} />
          ))}
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/search for anime or manga/i)).toBeInTheDocument();
  });

  it('renders About component on /about route', () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.About]}>
        <Routes>
          {routes.map((route, i) => (
            <Route key={i} path={route.path} element={route.element} />
          ))}
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
  });

  it('renders NotFound component on unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/some/unknown/path']}>
        <Routes>
          {routes.map((route, i) => (
            <Route key={i} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/does not exist/i)).toBeInTheDocument();
  });
});
