import Layout from '@/components/layout/Layout';
import AboutPage from '@/pages/AboutPage';
import store from '@/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router';

describe('About page', () => {
  it('renders on first mount', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="about" element={<AboutPage />} />
            </Route>
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toHaveClass('text-amber-500');
    expect(screen.getByText(/course/i)).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
  });
});
