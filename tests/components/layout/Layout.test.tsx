import Layout from '@/components/layout/Layout';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';

describe('Layout component', () => {
  it('renders Header, Footer and children content via Outlet', () => {
    render(
      <MemoryRouter initialEntries={['/react-jikan-app/']}>
        <Routes>
          <Route path="/react-jikan-app/" element={<Layout />}>
            <Route index element={<div>Discover Your Next Adventure</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Jikan/i)).toBeInTheDocument();
    expect(screen.getByText(/Discover Your Next Adventure/i)).toBeInTheDocument();
    expect(screen.getByText(/2025/i)).toBeInTheDocument();
  });
});
