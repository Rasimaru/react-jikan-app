import React, { useEffect, useState, type JSX } from 'react';
import type { SearchProps } from '@/types/types';
import { Search } from 'lucide-react';
import useLocalStorage from '@/hooks/useLocalStorage';

const SearchBar = (props: SearchProps): JSX.Element => {
  const { searchQuery, onSearch } = props;

  const [storedQuery, setStoredQuery] = useLocalStorage('searchQuery', searchQuery);

  const [localQuery, setLocalQuery] = useState(storedQuery);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLocalQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const trimmedQuery = localQuery.trim();

    setStoredQuery(trimmedQuery);
    onSearch(trimmedQuery);
  };

  return (
    <form
      autoComplete="none"
      onSubmit={handleSubmit}
      className="flex sm:max-w-[500px] min-[340px]:w-full w-max transition-all duration-700 delay-500 translate-y-0 opacity-100 overflow-clip"
    >
      <label className="relative flex grow">
        <Search aria-hidden="true" focusable="false" className="absolute top-1/4 left-2"></Search>
        <input
          type="search"
          name="SearchBox"
          aria-label="Search input"
          value={localQuery}
          onChange={handleChange}
          placeholder="Search for anime or manga..."
          className="flex grow rounded-md border bg-background px-3 py-2 text-base md:text-lg pl-10 h-12 rounded-r-none max-[380px]:pr-0 placeholder:text-gray-400"
        ></input>
      </label>
      <button
        type="submit"
        className="inline-flex items-center bg-amber-500 text-black py-1 px-3 hover:bg-amber-300 hover:cursor-pointer rounded-r text-base duration-300 font-semibold"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
