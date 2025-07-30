import React, { useEffect, useState, type JSX } from 'react';
import type { SearchProps } from '@/types/types';
import { Search } from 'lucide-react';

const SearchBar = (props: SearchProps): JSX.Element => {
  const { searchQuery, onSearch } = props;
  const [query, setQuery] = useState(searchQuery);

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    setQuery(trimmedQuery);
    localStorage.setItem('searchQuery', trimmedQuery);
    onSearch(trimmedQuery);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex sm:w-[500px] w-full transition-all duration-700 delay-500 translate-y-0 opacity-100"
    >
      <label className="relative flex grow">
        <Search aria-hidden="true" focusable="false" className="absolute top-1/4 left-2"></Search>
        <input
          type="search"
          aria-label="Search input"
          value={query}
          onChange={handleChange}
          placeholder="Search for anime or manga..."
          className="grow rounded-md border bg-background px-3 py-2 text-base md:text-lg pl-10 h-12 rounded-r-none"
        ></input>
      </label>
      <button
        type="submit"
        className="inline-flex  items-center bg-amber-500 text-black py-1 px-3 hover:bg-amber-300 dark:hover:bg-gray-100 hover:cursor-pointer rounded-r text-base duration-300 font-semibold"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
