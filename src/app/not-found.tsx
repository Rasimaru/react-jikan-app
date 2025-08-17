import { type JSX } from 'react';

const NotFound = (): JSX.Element => {
  return (
    <section
      role="alert"
      aria-labelledby="not-found-title"
      aria-describedby="not-found-description"
      className="container text-center grow flex flex-col justify-center items-center gap-4 h-full"
    >
      <h2 id="not-found-title" className="text-4xl">
        404 – Page Not Found
      </h2>
      <p id="not-found-description" className="text-2xl">
        The page you are looking for does not exist.
      </p>
    </section>
  );
};

export default NotFound;
