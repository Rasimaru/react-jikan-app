import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from './components/hero/Hero';
import CardList from './components/catalog/CardList';
import type { AppState } from './types/types';

const defaultUrl = 'https://api.jikan.moe/v4/top/anime?type=tv&filter=airing&page=1';
const baseUrl = 'https://api.jikan.moe/v4/anime?q=';

class App extends React.Component<object, AppState> {
  state: AppState = {
    items: [],
    searchQuery: ''
  };

  componentDidMount(): void {
    const query = localStorage.getItem('searchQuery') || '';

    this.setState({ searchQuery: query }, () => {
      const url = query !== '' ? `${baseUrl}${encodeURIComponent(query)}` : defaultUrl;

      fetch(url)
        .then((response) => response.json())
        .then((data) => this.setState({ items: data.data }));
    });
  }

  componentDidUpdate(_: object, prevState: AppState): void {
    if (prevState.searchQuery !== this.state.searchQuery) {
      const query = this.state.searchQuery;
      const url = query !== '' ? `${baseUrl}${encodeURIComponent(query)}` : defaultUrl;

      fetch(url)
        .then((response) => response.json())
        .then((data) => this.setState({ items: data.data }));
    }
  }

  handleSearch = (query: string): void => {
    this.setState({ searchQuery: query });
  };

  render(): React.JSX.Element {
    return (
      <Layout>
        <Hero onSearch={this.handleSearch} searchQuery={this.state.searchQuery}></Hero>
        <CardList items={this.state.items} />
      </Layout>
    );
  }
}

export default App;
