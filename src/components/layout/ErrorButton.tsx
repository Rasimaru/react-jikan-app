import type { ErrorButtonState } from '@/types/types';
import React from 'react';

class ErrorButton extends React.Component<object, ErrorButtonState> {
  state: ErrorButtonState = {
    shouldThrow: false
  };

  handleClick = (): void => {
    this.setState({ shouldThrow: true });
  };

  render(): React.JSX.Element {
    if (this.state.shouldThrow) {
      throw new Error('ErrorBoundary check');
    }

    return (
      <button
        onClick={this.handleClick}
        className="inline-flex items-center animate-pulse bg-amber-300 text-black border-0 py-1.5 px-3 focus:outline-none hover:bg-gray-200 hover:cursor-pointer rounded text-base font-semibold duration-300"
      >
        Throw Error
      </button>
    );
  }
}

export default ErrorButton;
