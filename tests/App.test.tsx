import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import App from '@/App';
import ReactDOM from 'react-dom';

jest.mock('@/components/forms/HookForm', () => ({
  __esModule: true,
  default: ({ onSubmit }: { onSubmit: (data: unknown) => void }) => (
    <form
      data-testid="hook-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ name: 'Bob' });
      }}
    >
      <button type="submit">Submit</button>
    </form>
  )
}));

jest.mock('@/components/forms/UncontrolledForm', () => ({
  __esModule: true,
  default: ({ onSubmit }: { onSubmit: (data: unknown) => void }) => (
    <form
      data-testid="uncontrolled-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ name: 'Alice' });
      }}
    >
      <button type="submit">Submit</button>
    </form>
  )
}));

jest.mock('@/components/forms/CardItem', () => ({
  __esModule: true,
  default: ({ item }: { item: { name: string } }) => <div data-testid="card-item">{item.name}</div>
}));

beforeAll(() => {
  jest.spyOn(ReactDOM, 'createPortal').mockImplementation((el: React.ReactNode) => {
    return el as React.ReactPortal;
  });
});

describe('App component', () => {
  beforeEach(() => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) document.body.removeChild(modalRoot);
  });

  test('renders Controlled and Uncontrolled buttons', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const controlledBtn = screen.getByText('Controlled');
    const uncontrolledBtn = screen.getByText('Uncontrolled');

    expect(controlledBtn).toBeInTheDocument();
    expect(uncontrolledBtn).toBeInTheDocument();
  });

  test('opens Controlled modal on click', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const controlledBtn = screen.getByText('Controlled');
    fireEvent.click(controlledBtn);

    const hookForm = screen.getByTestId('hook-form');
    expect(hookForm).toBeInTheDocument();
  });

  test('opens Uncontrolled modal on click', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const uncontrolledBtn = screen.getByText('Uncontrolled');
    fireEvent.click(uncontrolledBtn);

    const uncontrolledForm = screen.getByTestId('uncontrolled-form');
    expect(uncontrolledForm).toBeInTheDocument();
  });

  test('submits Controlled form and renders CardItem', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    fireEvent.click(screen.getByText('Controlled'));
    fireEvent.submit(screen.getByTestId('hook-form'));

    await waitFor(() => {
      expect(screen.getByTestId('card-item')).toHaveTextContent('Bob');
    });
  });

  test('submits Uncontrolled form and renders CardItem', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    fireEvent.click(screen.getByText('Uncontrolled'));
    fireEvent.submit(screen.getByTestId('uncontrolled-form'));

    await waitFor(() => {
      expect(screen.getByTestId('card-item')).toHaveTextContent('Alice');
    });
  });

  test('closes Controlled modal on Close button click', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const controlledBtn = screen.getByText('Controlled');
    fireEvent.click(controlledBtn);

    const closeBtn = screen.getByText('Close');
    fireEvent.click(closeBtn);

    expect(screen.queryByTestId('hook-form')).not.toBeInTheDocument();
  });

  test('closes Uncontrolled modal on Close button click', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const uncontrolledBtn = screen.getByText('Uncontrolled');
    fireEvent.click(uncontrolledBtn);

    const closeBtn = screen.getByText('Close');
    fireEvent.click(closeBtn);

    expect(screen.queryByTestId('uncontrolled-form')).not.toBeInTheDocument();
  });
});
