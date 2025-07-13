import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

class Fallback extends React.Component {
  render() {
    return (
      <section className="flex flex-col justify-center items-center gap-8 h-screen">
        <DotLottieReact
          src="./Fox-fall.lottie"
          loop
          autoplay
          className="w-70 h-70"
        ></DotLottieReact>
        <h2 className="text-4xl">Oops! Sorry for the inconvenience!</h2>
        <p className="text-2xl">The Fox is already working on fixing it!</p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center animate-pulse bg-amber-300 text-black border-0 py-2 px-3 focus:outline-none hover:bg-gray-200 hover:cursor-pointer rounded text-[20px] font-bold"
        >
          Reload
        </button>
      </section>
    );
  }
}

export default Fallback;
