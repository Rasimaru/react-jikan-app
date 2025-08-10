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

  if (isLoading) return <Spinner />;
  if (isFetching && !isLoading) return <p className="text-lg">Reloading...</p>;
  if (error) return <p>{error}</p>;

  if (isEmpty)
    return (
      <p role="alert" className="text-center text-[18px]">
        Nothing found matching &quot;{searchQuery}&quot;
      </p>
    );

  return (
    <section aria-label="search results" className="flex flex-col gap-10 sm:pb-10 pb-5 relative">
      <CardList items={items} />
      <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
      {detailsId && !isFetching && <DetailsDrawer id={detailsId} />}
      <RefreshButton isRefreshing={isRefreshing} onRefresh={refreshAnime} />
    </section>
  );
};

export default SearchResults;
