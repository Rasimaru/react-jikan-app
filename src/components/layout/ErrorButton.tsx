import type { ErrorButtonState } from '@/types/types';
import React from 'react';

class ErrorButton extends React.Component<object, ErrorButtonState> {
  state = {
    shouldThrow: false
  };

  render(): React.ReactNode {
    if (this.state.shouldThrow) {
      throw new Error('ErrorBoundary check');
    }

    return (
      <button
        onClick={() => this.setState({ shouldThrow: true })}
        className="inline-flex items-center animate-pulse bg-amber-300 text-black border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 hover:cursor-pointer rounded text-base mt-4 md:mt-0"
      >
        Throw Error
      </button>
    );
  }
}

export default ErrorButton;
