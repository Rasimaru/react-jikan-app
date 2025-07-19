import Layout from '@/components/layout/Layout';
import { render, screen } from '@testing-library/react';

jest.mock('@/assets/logo-fox.svg', () => 'mock-logo.svg');

describe('Layout component', () => {
  it('renders Header, Footer and children content', () => {
    render(
      <Layout>
        <div>Template content</div>
      </Layout>
    );

    expect(screen.getByText(/Jikan/i)).toBeInTheDocument();
    expect(screen.getByText(/Template content/i)).toBeInTheDocument();
    expect(screen.getByText(/2025/i)).toBeInTheDocument();
  });
});
