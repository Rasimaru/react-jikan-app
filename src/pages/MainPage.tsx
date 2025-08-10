import { useEffect, type JSX } from 'react';

import useLocalStorage from '@/hooks/useLocalStorage';
import usePagination from '@/hooks/usePagination';
import useUrlParams from '@/hooks/useUrlParams';

import SearchResults from '@/components/results/SearchResults';
import Search from '@/components/search/Search';
import { useGetAnimeSearchQuery, useGetSeasonTopQuery } from '@/services/apiSlice';
import { extractErrorMessage } from '@/utils/utils';

const MainPage = (): JSX.Element => {
  const { getParam, setParams } = useUrlParams();
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');
  const { currentPage, changePage } = usePagination();
  const {
    data: seasonData,
    error: seasonError,
    isLoading: isSeasonLoading,
    isFetching: isSeasonFetching
  } = useGetSeasonTopQuery(currentPage, { skip: !!searchQuery.trim() });
  const {
    data: searchData,
    error: searchError,
    isLoading: isSearchLoading,
    isFetching: isSearchFetching
  } = useGetAnimeSearchQuery(
    { query: searchQuery, page: currentPage },
    { skip: !searchQuery.trim() }
  );

  const data = searchQuery.trim() ? searchData : seasonData;
  const error = searchQuery.trim() ? searchError : seasonError;
  const isLoading = searchQuery.trim() ? isSearchLoading : isSeasonLoading;
  const isFetching = searchQuery.trim() ? isSearchFetching : isSeasonFetching;

  useEffect(() => {
    if (!getParam('page')) {
      setParams({ q: searchQuery, page: '1' }, { replace: true });
    }
  }, [getParam, setParams, searchQuery]);

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
    setParams({ q: query, page: '1' });
  };

  const errorMessage = extractErrorMessage(error);

  return (
    <>
      <Search onSearch={handleSearch} searchQuery={searchQuery} />
      <SearchResults
        items={data?.data || []}
        error={errorMessage || ''}
        isLoading={isLoading}
        isFetching={isFetching}
        searchQuery={searchQuery}
        page={currentPage}
        totalPages={data?.pagination.last_visible_page || 1}
        onPageChange={changePage}
      />
    </>
  );
};

export default MainPage;
