import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from './components/hero/Hero';
import CardList from './components/catalog/CardList';
import type { AppState } from './types/types';
import Spinner from './components/layout/Spinner';

const defaultUrl = 'https://api.jikan.moe/v4/top/anime?type=tv&filter=airing&page=1';
const baseUrl = 'https://api.jikan.moe/v4/anime?q=';

class App extends React.Component<object, AppState> {
  state: AppState = {
    items: [],
    searchQuery: '',
    isLoading: false,
    error: null
  };

  componentDidMount(): void {
    const query = localStorage.getItem('searchQuery') || '';

    this.setState({ searchQuery: query }, () => {
      const url = query !== '' ? `${baseUrl}${encodeURIComponent(query)}` : defaultUrl;
      this.setState({ isLoading: true });
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => this.setState({ items: data.data }))
        .catch((error: Error) => {
          console.error(error);
          this.setState({ error: error.message });
        })
        .finally(() => this.setState({ isLoading: false }));
    });
  }

  componentDidUpdate(_: object, prevState: AppState): void {
    if (prevState.searchQuery !== this.state.searchQuery) {
      const query = this.state.searchQuery;
      const url = query !== '' ? `${baseUrl}${encodeURIComponent(query)}` : defaultUrl;

      this.setState({ isLoading: true });
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => this.setState({ items: data.data }))
        .catch((error: Error) => {
          console.error(error);
          this.setState({ error: error.message });
        })
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  handleSearch = (query: string): void => {
    this.setState({ searchQuery: query });
  };

  render(): React.JSX.Element {
    const { isLoading, error, items, searchQuery } = this.state;
    const isEmpty = items.length === 0;
    return (
      <Layout>
        <Hero onSearch={this.handleSearch} searchQuery={this.state.searchQuery}></Hero>
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p>Search Error: {this.state.error}</p>
        ) : isEmpty ? (
          <p className="text-center text-[18px]">
            Nothing found matching &quot;{searchQuery}&quot;
          </p>
        ) : (
          <CardList items={items} />
        )}
      </Layout>
    );
  }
}

export default App;
