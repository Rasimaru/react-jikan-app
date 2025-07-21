import React from 'react';
import SearchBar from './SearchBar';
import type { HeroProps } from '@/types/types';

const Hero = (props: HeroProps): React.JSX.Element => {
  const { onSearch, searchQuery } = props;
  return (
    <section className="hero flex items-center justify-center flex-col gap-6  w-full">
      <h2 className="text-5xl">Discover Your Next Adventure</h2>
      <p className="text-lg text-center">
        Track, discover, and discuss your favorite anime and manga all in one place.
      </p>
      <SearchBar onSearch={onSearch} searchQuery={searchQuery}></SearchBar>
    </section>
  );
};

export default Hero;
