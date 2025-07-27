import React from 'react';
import type { SearchBarProps } from '@/types/types';
import { Search } from 'lucide-react';
import useLocalStorage from '@/hooks/useLocalStorage';

const SearchBar = (props: SearchBarProps) => {
  const { onSearch, searchQuery } = props;
  const [query, setQuery] = useLocalStorage('searchQuery', searchQuery);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    setQuery(trimmedQuery);
    onSearch(trimmedQuery);
  };

  return (
    <form
      role="form"
      onSubmit={handleSubmit}
      className="flex sm:w-[500px] transition-all duration-700 delay-500 translate-y-0 opacity-100 relative"
    >
      <Search className="absolute top-1/4 left-2"></Search>
      <input
        role="searchbox"
        type="search"
        defaultValue={query}
        onChange={handleChange}
        placeholder="Search for anime or manga..."
        className="flex grow rounded-md border border-input bg-background px-3 py-2 text-base md:text-lg pl-10 h-12 rounded-r-none"
      ></input>
      <button
        type="submit"
        className="inline-flex items-center bg-neutral-900 text-white dark:bg-gray-100 dark:text-black border-0 py-1 px-3 focus:outline-none hover:bg-neutral-700 dark:hover:bg-gray-300 hover:cursor-pointer rounded-r text-base duration-300 font-semibold"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
