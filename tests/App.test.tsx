import App from '@/App';
import ThemeProvider from '@/context/ThemeContext';
import store from '@/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

describe('App component', () => {
  test('renders MainPage on root path', () => {
    render(
      <MemoryRouter initialEntries={['/react-jikan-app/']}>
        <Provider store={store}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Adventure/i)).toBeInTheDocument();
  });

  test('renders AboutPage on /about path', () => {
    render(
      <MemoryRouter initialEntries={['/react-jikan-app/about']}>
        <Provider store={store}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/course/i)).toBeInTheDocument();
  });

  test('renders NotFoundPage on unknown path', () => {
    render(
      <MemoryRouter initialEntries={['/react-jikan-app/unknown']}>
        <Provider store={store}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
