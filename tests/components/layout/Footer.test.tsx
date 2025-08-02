import Footer from '@/components/layout/Footer';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

describe('Footer component', () => {
  it('renders RSSchool and github links', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const schoolLink = screen.getByText(/Rolling/i);
    expect(schoolLink).toBeInTheDocument();

    const githubLink = screen.getByText(/Rasimaru/i);
    expect(githubLink).toBeInTheDocument();
  });

  it('links have valid path', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const schoolLink = screen.getByText(/Rolling/i);
    expect(schoolLink).toHaveAttribute('href', 'https://rs.school/');

    const githubLink = screen.getByText(/Rasimaru/i);
    expect(githubLink).toHaveAttribute('href', 'https://github.com/Rasimaru');
  });
});
