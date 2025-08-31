import type { ControlsProps } from '@/lib/types';
import type { ChangeEvent, JSX } from 'react';
import { memo } from 'react';

const ResultsControls = memo(function ResultsControls(props: ControlsProps): JSX.Element {
  const { selectedYear, onYearChange, searchQuery, onSearchChange, openModal } = props;

  const handleYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onYearChange(value === '' ? null : Number(value));
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="flex items-center justify-between mb-4 gap-2">
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Year"
          value={selectedYear ?? ''}
          min={1750}
          onChange={handleYearChange}
          className="border-2 px-2 py-1 rounded hover:bg-blue-500 hover:text-white duration-300"
        />
        <input
          type="text"
          placeholder="Search country"
          value={searchQuery}
          onChange={handleSearch}
          className="border-2 px-2 py-1 rounded hover:bg-blue-500 hover:text-white duration-300"
        />
        <button
          onClick={openModal}
          className="bg-blue-500 border-2 text-white px-3 py-1 rounded hover:bg-blue-300 hover:text-black cursor-pointer duration-300"
        >
          Add Columns
        </button>
      </div>
    </div>
  );
});

export default ResultsControls;
