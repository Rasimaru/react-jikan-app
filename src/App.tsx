import { useEffect, useState, type JSX } from 'react';
import Layout from '@/components/layout/Layout';
import CardList from './components/catalog/CardList';
import type { CardItem } from './types/types';

import Spinner from './components/shared/ui/Spinner';
import Search from './components/search/Search';
import fetchData from './services/api';

const App = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState(() => localStorage.getItem('searchQuery') || '');
  const [items, setItems] = useState<CardItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetchData(searchQuery)
      .then((data) => setItems(data.data))
      .catch((error: Error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  }, [searchQuery]);

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
