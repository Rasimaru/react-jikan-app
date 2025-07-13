import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import React from 'react';

class Spinner extends React.Component {
  render() {
    return (
      <div className="">
        <DotLottieReact
          src="./Fox-spin.lottie"
          loop
          autoplay
          className="w-60 h-60"
        ></DotLottieReact>
      </div>
    );
  }
}

export default Spinner;
