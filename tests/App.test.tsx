import App from '@/App';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

describe('App component', () => {
  test('renders MainPage on root path', () => {
    render(
      <MemoryRouter initialEntries={['/react-jikan-app/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Adventure/i)).toBeInTheDocument();
  });

  test('renders AboutPage on /about path', () => {
    render(
      <MemoryRouter initialEntries={['/react-jikan-app/about']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/course/i)).toBeInTheDocument();
  });

  test('renders NotFoundPage on unknown path', () => {
    render(
      <MemoryRouter initialEntries={['/react-jikan-app/unknown']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
