import Card from '@/components/results/Card';
import { render, screen } from '@testing-library/react';
import { mockItem } from '../../mocks/data/items';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from '@/store';
import userEvent from '@testing-library/user-event';

describe('Card component', () => {
  it('renders title, year, image alt and score from props', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Card item={mockItem} />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByAltText(/test/i)).toBeInTheDocument();
    expect(screen.getByText(/test/i)).toBeInTheDocument();
    expect(screen.getByText(/2025/i)).toBeInTheDocument();
    expect(screen.getByText(/1.25/i)).toBeInTheDocument();
  });

  it('renders "TBD" if year is null', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Card item={{ ...mockItem, year: null }} />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/TBD/i)).toBeInTheDocument();
  });

  it('changes checked state on click', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Card item={mockItem} />
        </Provider>
      </MemoryRouter>
    );

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);

    expect(screen.getByText('Selected')).toBeInTheDocument();
    expect(screen.getByTestId(/CheckedIcon/i)).toBeInTheDocument();
  });
});
