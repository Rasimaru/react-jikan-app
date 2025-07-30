import React from 'react';
import Layout from '@/components/layout/Layout';

import CardList from './components/catalog/CardList';
import type { AppState, JikanApiResponse } from './types/types';

import { API_SEARCH, API_TOP_AIRING } from './types/constants';
import checkResponse from './utils/http/checkResponse';
import Spinner from './components/shared/ui/Spinner';
import Search from './components/search/Search';

class App extends React.Component<object, AppState> {
  state: AppState = {
    items: [],
    searchQuery: '',
    isLoading: false,
    error: null
  };

  componentDidMount(): void {
    const query = localStorage.getItem('searchQuery') || '';

    if (query === this.state.searchQuery) {
      this.fetchData(query);
    } else {
      this.setState({ searchQuery: query });
    }
  }

  componentDidUpdate(_: object, prevState: AppState): void {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchData(this.state.searchQuery);
    }
  }

  fetchData(query: string): void {
    const url = query !== '' ? `${API_SEARCH}?q=${encodeURIComponent(query)}` : API_TOP_AIRING;

    this.setState({ isLoading: true, error: null });

    fetch(url)
      .then(checkResponse<JikanApiResponse>)
      .then((data) => this.setState({ items: data.data }))
      .catch((error: Error) => {
        console.error(error);
        this.setState({ error: error.message });
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  handleSearch = (query: string): void => {
    this.setState({ searchQuery: query });
  };

  render(): React.JSX.Element {
    const { isLoading, error, items, searchQuery } = this.state;
    const isEmpty = items.length === 0;
    return (
      <Layout>
        <Search onSearch={this.handleSearch} searchQuery={this.state.searchQuery} />
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p>{error}</p>
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
