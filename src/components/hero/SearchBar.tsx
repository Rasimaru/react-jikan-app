import React from 'react';
import type { SearchBarProps } from '@/types/types';

class SearchBar extends React.Component<SearchBarProps> {
  private tempQuery = this.props.searchQuery;

  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.tempQuery = e.target.value;
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const query = this.tempQuery.trim();
    localStorage.setItem('searchQuery', query);
    this.props.onSearch(query);
  };

  render(): React.JSX.Element {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="flex w-[500px]  transition-all duration-700 delay-500 translate-y-0 opacity-100"
      >
        <input
          type="search"
          defaultValue={this.props.searchQuery}
          onChange={this.handleChange}
          placeholder="Search for anime or manga..."
          className="flex grow rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 h-12 rounded-r-none"
        ></input>
        <button
          type="submit"
          className="inline-flex items-center bg-gray-100 text-black border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 hover:cursor-pointer rounded-r-md text-base mt-4 md:mt-0"
        >
          Search
        </button>
      </form>
    );
  }
}

export default SearchBar;
