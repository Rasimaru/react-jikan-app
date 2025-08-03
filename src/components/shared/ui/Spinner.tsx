import { type JSX } from 'react';

const Spinner = (): JSX.Element => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex justify-center items-start w-full h-[50vh]"
    >
      <div
        aria-label="Loading"
        data-testid="spinner"
        className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent border-amber-500"
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
