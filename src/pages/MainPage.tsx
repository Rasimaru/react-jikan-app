import { useEffect, type JSX } from 'react';

import useFetchData from '@/hooks/useFetchData';
import useLocalStorage from '@/hooks/useLocalStorage';
import usePagination from '@/hooks/usePagination';
import useUrlParams from '@/hooks/useUrlParams';

import SearchResults from '@/components/results/SearchResults';
import Search from '@/components/search/Search';

const MainPage = (): JSX.Element => {
  const { getParam, setParams } = useUrlParams();
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');
  const { currentPage, changePage } = usePagination();
  const { items, isLoading, error, totalPages } = useFetchData(searchQuery, currentPage);

  useEffect(() => {
    if (!getParam('page')) {
      setParams({ q: searchQuery, page: '1' }, { replace: true });
    }
  });

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
    setParams({ q: query, page: '1' });
  };

  return (
    <>
      <Search onSearch={handleSearch} searchQuery={searchQuery} />
      <SearchResults
        items={items}
        error={error}
        isLoading={isLoading}
        searchQuery={searchQuery}
        page={currentPage}
        totalPages={totalPages}
        onPageChange={changePage}
      />
    </>
  );
};

export default MainPage;
