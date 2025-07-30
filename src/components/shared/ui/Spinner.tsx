import React from 'react';

class Spinner extends React.Component {
  render(): React.JSX.Element {
    return (
      <div className="flex justify-center items-start w-full h-[50vh]">
        <div
          data-testid="spinner"
          className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent border-amber-500"
        />
      </div>
    );
  }
}

export default Spinner;
