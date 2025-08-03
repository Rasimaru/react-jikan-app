import Layout from '@/components/layout/Layout';
import ThemeProvider from '@/context/ThemeContext';
import store from '@/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router';

describe('Layout component', () => {
  it('renders Header, Footer and children content via Outlet', () => {
    render(
      <MemoryRouter initialEntries={['/react-jikan-app/']}>
        <Provider store={store}>
          <ThemeProvider>
            <Routes>
              <Route path="/react-jikan-app/" element={<Layout />}>
                <Route index element={<div>Discover Your Next Adventure</div>} />
              </Route>
            </Routes>
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Jikan/i)).toBeInTheDocument();
    expect(screen.getByText(/Discover Your Next Adventure/i)).toBeInTheDocument();
    expect(screen.getByText(/2025/i)).toBeInTheDocument();
  });
});
