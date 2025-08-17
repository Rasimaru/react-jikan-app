import Link from 'next/link';
import { type JSX } from 'react';

const NotFound = (): JSX.Element => {
  return (
    <section
      role="alert"
      aria-labelledby="not-found-title"
      aria-describedby="not-found-description"
      className="container text-center grow flex flex-col justify-center items-center gap-4 h-full bg-gray-100 dark:bg-neutral-900 text-black dark:text-gray-100"
    >
      <h2 id="not-found-title" className="text-4xl">
        404 – Page Not Found
      </h2>
      <p id="not-found-description" className="text-2xl">
        The page you are looking for does not exist.
      </p>
      <Link
        href={'/'}
        className="inline-flex items-center bg-amber-500 text-black border-0 py-2 px-3 focus:outline-none hover:bg-amber-300 hover:cursor-pointer duration-300 rounded text-[20px] font-bold"
      >
        To main page
      </Link>
    </section>
  );
};

export default NotFound;
<div className="px-5 flex flex-col items-center justify-center text-center mx-auto bg-gray-100 dark:bg-neutral-900 text-black dark:text-gray-100 min-h-full w-full"></div>;
