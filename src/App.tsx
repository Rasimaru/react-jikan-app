import { type JSX } from 'react';
import useFetchData from './hooks/useFetchData';

import Layout from '@/components/layout/Layout';
import CardList from './components/catalog/CardList';
import Spinner from './components/shared/ui/Spinner';
import Search from './components/search/Search';
import useLocalStorage from './hooks/useLocalStorage';

const App = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');
  const { items, isLoading, error } = useFetchData(searchQuery);

  const handleSearch = (query: string): void => {
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
