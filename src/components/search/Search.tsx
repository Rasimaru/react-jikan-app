import { type JSX } from 'react';
import SearchBar from './SearchBar';
import type { SearchProps } from '@/types/types';

const Search = (props: SearchProps): JSX.Element => {
  const { searchQuery, onSearch } = props;
  return (
    <section
      aria-labelledby="search-heading"
      className="hero flex items-center justify-center flex-col gap-6 w-full"
    >
      <h2 className="sm:text-5xl text-4xl">Discover Your Next Adventure</h2>
      <p className="sm:text-lg text-base text-center">
        Track, discover, and discuss your favorite anime and manga all in one place.
      </p>
      <SearchBar onSearch={onSearch} searchQuery={searchQuery}></SearchBar>
    </section>
  );
};

export default Search;
