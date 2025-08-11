import SearchResults from '@/components/results/SearchResults';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { mockItems } from '../../mocks/data/items';
import userEvent from '@testing-library/user-event';
import store from '@/store';
import { Provider } from 'react-redux';

describe('SearchResults component', () => {
  it('renders loader while loading', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SearchResults
            items={mockItems}
            searchQuery=""
            isLoading={true}
            isFetching={false}
            error={null}
            page={1}
            totalPages={2}
            onPageChange={jest.fn()}
          />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows error message if error occurs', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SearchResults
            items={mockItems}
            searchQuery=""
            isLoading={false}
            isFetching={false}
            error={'Something went wrong'}
            page={1}
            totalPages={2}
            onPageChange={jest.fn()}
          />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  it('shows result message if nothing found matching', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SearchResults
            items={[]}
            searchQuery="test"
            isLoading={false}
            isFetching={false}
            error={null}
            page={1}
            totalPages={2}
            onPageChange={jest.fn()}
          />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Nothing found matching "test"/i)).toBeInTheDocument();
  });

  it('renders results with pagination', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SearchResults
            items={mockItems}
            searchQuery=""
            isLoading={false}
            isFetching={false}
            error={null}
            page={1}
            totalPages={2}
            onPageChange={jest.fn()}
          />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/card 1/i)).toBeInTheDocument();
    expect(screen.getByText('1 / 2')).toBeInTheDocument();
    expect(screen.getByText(/next/i)).toBeInTheDocument();
  });

  it('renders results and calls onPageChange on click', async () => {
    const onPageChange = jest.fn();

    const { rerender } = render(
      <MemoryRouter>
        <Provider store={store}>
          <SearchResults
            items={mockItems}
            searchQuery=""
            isLoading={false}
            isFetching={false}
            error={null}
            page={1}
            totalPages={2}
            onPageChange={onPageChange}
          />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('1 / 2')).toBeInTheDocument();

    const nextBtn = screen.getByText(/next/i);
    await userEvent.click(nextBtn);

    expect(onPageChange).toHaveBeenCalledWith(2);

    onPageChange.mockClear();
    rerender(
      <MemoryRouter>
        <Provider store={store}>
          <SearchResults
            items={mockItems}
            searchQuery=""
            isLoading={false}
            isFetching={false}
            error={null}
            page={2}
            totalPages={2}
            onPageChange={onPageChange}
          />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('2 / 2')).toBeInTheDocument();
    await userEvent.click(screen.getByText(/next/i));
    expect(onPageChange).not.toHaveBeenCalled();

    const prevBtn = screen.getByText(/prev/i);
    await userEvent.click(prevBtn);
    expect(onPageChange).toHaveBeenCalledWith(1);
  });
});
