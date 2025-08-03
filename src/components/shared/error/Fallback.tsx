import { type JSX } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import type { FallbackProps } from '@/types/types';

const Fallback = (props: FallbackProps): JSX.Element => {
  const { onReset } = props;
  return (
    <section
      role="alert"
      aria-labelledby="fallback-title"
      aria-describedby="fallback-description"
      className="container text-center grow flex flex-col justify-center items-center gap-4 h-full"
    >
      <DotLottieReact src="./Fox-fall.lottie" loop autoplay className="w-50 h-50"></DotLottieReact>
      <h2 id="fallback-title" className="text-4xl">
        Oops! Sorry for the inconvenience!
      </h2>
      <p id="fallback-description" className="text-2xl">
        The Fox is already fixing the issue!
      </p>
      <button
        data-testid="Error reset"
        onClick={onReset}
        aria-label="Reset an error"
        className="inline-flex items-center animate-pulse bg-amber-300 text-black border-0 py-2 px-3 focus:outline-none hover:bg-gray-200 hover:cursor-pointer rounded text-[20px] font-bold"
      >
        Reload page
      </button>
    </section>
  );
};

export default Fallback;
