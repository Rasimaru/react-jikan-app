import { type JSX } from 'react';
import { useSearchParams } from 'react-router';

import type { PaginationProps, ResultsProps } from '@/types/types';
import Spinner from '../shared/ui/Spinner';
import CardList from './CardList';
import Pagination from './Pagination';
import DetailsDrawer from './DetailsDrawer';
import RefreshButton from './RefreshButton';
import { useRefreshAnimeMutation } from '@/services/apiSlice';

const SearchResults = (props: ResultsProps & PaginationProps): JSX.Element => {
  const { items, isLoading, isFetching, error, searchQuery, page, totalPages, onPageChange } =
    props;
  const [searchParams] = useSearchParams();
  const detailsId = Number(searchParams.get('details')) || null;

  const isEmpty = items.length === 0;

  const [refreshAnime, { isLoading: isRefreshing }] = useRefreshAnimeMutation();

  return (
    <section
      aria-label="search results"
      className="flex flex-col gap-10 sm:pb-10 pb-5 relative w-full"
    >
      {isLoading && <Spinner />}
      {isFetching && <p className="text-lg m-auto">Reloading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !isFetching && !isEmpty && !error && !isEmpty && (
        <>
          <CardList items={items} />
          <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
          {detailsId && <DetailsDrawer id={detailsId} />}
        </>
      )}
      {isEmpty && (
        <p role="alert" className="text-center text-[18px]">
          Nothing found matching &quot;{searchQuery}&quot;
        </p>
      )}
      <RefreshButton isRefreshing={isRefreshing} onRefresh={refreshAnime} />
    </section>
  );
};

export default SearchResults;
