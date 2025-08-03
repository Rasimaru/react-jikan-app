import Header from '@/components/layout/Header';
import store from '@/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

describe('Header component', () => {
  test('renders logo and title', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByAltText(/Jikan logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Jikan/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
  });
});
