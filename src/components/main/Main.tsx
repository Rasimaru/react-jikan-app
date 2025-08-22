'use client';

import { useEffect, useMemo, type JSX } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import usePagination from '@/hooks/usePagination';
import useUrlParams from '@/hooks/useUrlParams';
import Search from './search/Search';
import SearchResults from './results/SearchResults';
import { useGetAnimeSearchQuery, useGetSeasonTopQuery } from '@/store/api/apiSlice';
import { extractErrorMessage } from '@/utils/utils';
import { MainProps } from '@/types/types';

const Main = ({ initialData, initialPage }: MainProps): JSX.Element => {
  const { getParam, setParams } = useUrlParams();
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');
  const { currentPage, changePage } = usePagination();

  const {
    data: seasonData,
    error: seasonError,
    isLoading: isSeasonLoading,
    isFetching: isSeasonFetching
  } = useGetSeasonTopQuery(currentPage, {
    skip: !!searchQuery.trim() || currentPage === initialPage,
    refetchOnMountOrArgChange: false
  });

  const {
    data: searchData,
    error: searchError,
    isLoading: isSearchLoading,
    isFetching: isSearchFetching
  } = useGetAnimeSearchQuery(
    { query: searchQuery, page: currentPage },
    { skip: !searchQuery.trim() }
  );

  const data = useMemo(() => {
    return searchQuery.trim() ? searchData : currentPage === initialPage ? initialData : seasonData;
  }, [searchQuery, currentPage, initialPage, initialData, searchData, seasonData]);
  const error = searchQuery.trim() ? searchError : currentPage === initialPage ? null : seasonError;
  const isLoading = searchQuery.trim()
    ? isSearchLoading
    : currentPage === initialPage
      ? false
      : isSeasonLoading;
  const isFetching = searchQuery.trim()
    ? isSearchFetching
    : currentPage === initialPage
      ? false
      : isSeasonFetching;

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

export default Main;
