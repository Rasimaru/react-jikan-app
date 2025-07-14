import React from 'react';
import SearchBar from './SearchBar';
import type { HeroProps } from '@/types/types';

class Hero extends React.Component<HeroProps> {
  render(): React.JSX.Element {
    return (
      <section className="hero flex items-center justify-center flex-col gap-6  w-full">
        <h2 className="text-5xl">Discover Your Next Adventure</h2>
        <p className="text-lg text-center">
          Track, discover, and discuss your favorite anime and manga all in one place.
        </p>
        <SearchBar onSearch={this.props.onSearch} searchQuery={this.props.searchQuery}></SearchBar>
      </section>
    );
  }
}

export default Hero;
