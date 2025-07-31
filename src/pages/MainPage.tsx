import type { JSX } from 'react';
import useFetchData from '@/hooks/useFetchData';
import useLocalStorage from '@/hooks/useLocalStorage';
import SearchResults from '@/components/results/SearchResults';
import Search from '@/components/search/Search';

const MainPage = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');
  const { items, isLoading, error } = useFetchData(searchQuery);

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
  };

  return (
    <>
      <Search onSearch={handleSearch} searchQuery={searchQuery} />
      <SearchResults items={items} error={error} isLoading={isLoading} searchQuery={searchQuery} />
    </>
  );
};

export default MainPage;
