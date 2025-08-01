import { useEffect, type JSX } from 'react';
import useFetchData from '@/hooks/useFetchData';
import useLocalStorage from '@/hooks/useLocalStorage';
import SearchResults from '@/components/results/SearchResults';
import Search from '@/components/search/Search';
import usePagination from '@/hooks/usePagination';
import { useSearchParams } from 'react-router';

const MainPage = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');
  const { currentPage, changePage } = usePagination();
  const { items, isLoading, error, totalPages } = useFetchData(searchQuery, currentPage);

  useEffect(() => {
    if (!searchParams.has('page')) {
      setSearchParams({ q: searchQuery, page: '1' }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
    const params = new URLSearchParams(searchParams);
    params.set('q', query);
    params.set('page', '1');
    setSearchParams(params);
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
