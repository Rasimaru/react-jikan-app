import { type JSX } from 'react';
import useFetchData from './hooks/useFetchData';
import useLocalStorage from './hooks/useLocalStorage';

import Layout from '@/components/layout/Layout';
import Search from './components/search/Search';
import SearchResults from './components/results/SearchResults';

const App = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');
  const { items, isLoading, error } = useFetchData(searchQuery);

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
  };

  return (
    <Layout>
      <Search onSearch={handleSearch} searchQuery={searchQuery} />
      <SearchResults items={items} error={error} isLoading={isLoading} searchQuery={searchQuery} />
    </Layout>
  );
};

export default App;
