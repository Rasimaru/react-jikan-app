import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { BASE_PATH } from '@/types/constants';

const Fallback = (): React.JSX.Element => {
  return (
    <section
      role="alert"
      className="container text-center grow flex flex-col justify-center items-center gap-4 h-full"
    >
      <DotLottieReact
        src="./Fox-fall.lottie"
        aria-hidden
        loop
        autoplay
        className="w-50 h-50"
      ></DotLottieReact>
      <h2 className="text-4xl">Oops! Sorry for the inconvenience!</h2>
      <p className="text-2xl">The Fox is already fixing the issue!</p>
      <a
        role="button"
        href={BASE_PATH}
        className="inline-flex items-center animate-pulse bg-amber-300 text-black border-0 py-2 px-3 focus:outline-none hover:bg-gray-200 hover:cursor-pointer rounded text-[20px] font-bold"
      >
        Reload
      </a>
    </section>
  );
};

export default Fallback;
