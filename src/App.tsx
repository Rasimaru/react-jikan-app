import { useEffect, useState, type JSX } from 'react';
import Layout from '@/components/layout/Layout';
import CardList from './components/catalog/CardList';
import type { CardItem, JikanApiResponse } from './types/types';

import { API_SEARCH, API_TOP_AIRING } from './types/constants';
import checkResponse from './utils/http/checkResponse';
import Spinner from './components/shared/ui/Spinner';
import Search from './components/search/Search';

const App = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState(() => localStorage.getItem('searchQuery') || '');
  const [items, setItems] = useState<CardItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData(searchQuery);
  }, [searchQuery]);

  const fetchData = (query: string): void => {
    const url = query !== '' ? `${API_SEARCH}?q=${encodeURIComponent(query)}` : API_TOP_AIRING;

    setIsLoading(true);
    setError(null);

    fetch(url)
      .then(checkResponse<JikanApiResponse>)
      .then((data) => setItems(data.data))
      .catch((error: Error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const handleSearch = (query: string): void => {
    setItems([]);
    setSearchQuery(query);
  };

  const isEmpty = items.length === 0;

  return (
    <Layout>
      <Search onSearch={handleSearch} searchQuery={searchQuery} />
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p>{error}</p>
      ) : isEmpty ? (
        <p role="alert" className="text-center text-[18px]">
          Nothing found matching &quot;{searchQuery}&quot;
        </p>
      ) : (
        <CardList items={items} />
      )}
    </Layout>
  );
};

export default App;
