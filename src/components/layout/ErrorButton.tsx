import React, { useState } from 'react';

const ErrorButton = (): React.JSX.Element => {
  const [shouldThrow, setShouldThrow] = useState(false);

  const handleClick = (): void => {
    setShouldThrow(true);
  };

  if (shouldThrow) {
    throw new Error('ErrorBoundary check');
  }
  return (
    <button
      aria-label="Trigger test error"
      onClick={handleClick}
      className="inline-flex items-center animate-pulse bg-amber-300 text-black border-0 py-1.5 px-3 focus:outline-none hover:bg-gray-200 hover:cursor-pointer rounded text-base font-semibold duration-300"
    >
      Throw Error
    </button>
  );
};

export default ErrorButton;
