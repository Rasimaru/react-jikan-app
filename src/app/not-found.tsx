import { type JSX } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { BASE_PATH } from '@/types/constants';
import Link from 'next/link';

const NotFound = (): JSX.Element => {
  return (
    <section
      role="alert"
      aria-labelledby="not-found-title"
      aria-describedby="not-found-description"
      className="container text-center grow flex flex-col justify-center items-center gap-4 h-full"
    >
      <DotLottieReact src="./Fox-fall.lottie" loop autoplay className="w-50 h-50"></DotLottieReact>
      <h2 id="not-found-title" className="text-4xl">
        404 – Page Not Found
      </h2>
      <p id="not-found-description" className="text-2xl">
        The page you are looking for does not exist.
      </p>
      <Link
        href={BASE_PATH}
        aria-label="Go to main page"
        className="inline-flex items-center bg-amber-500 text-black border-0 py-1.5 px-5 focus:outline-none hover:bg-amber-300 hover:cursor-pointer rounded font-semibold duration-300 mb-10"
      >
        Back to main
      </Link>
    </section>
  );
};

export default NotFound;
