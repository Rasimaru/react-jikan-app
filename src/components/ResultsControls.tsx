import type { ControlsProps, CountryProps } from '@/types/types';
import type { ChangeEvent, JSX } from 'react';

export function ResultsControls(props: ControlsProps): JSX.Element {
  const {
    countries,
    selectedYear,
    onYearChange,
    searchQuery,
    onSearchChange,
    setFilteredCountries,
    openModal
  } = props;

  const handleYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    onYearChange(Number(e.target.value));
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value.toLowerCase();
    onSearchChange(searchQuery);

    const filtered: CountryProps[] = countries.filter((prop) =>
      prop.country.toLowerCase().includes(searchQuery)
    );
    setFilteredCountries(filtered);
  };

  return (
    <div className="flex items-center justify-between mb-4 gap-2">
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Year"
          value={selectedYear ?? ''}
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
}
