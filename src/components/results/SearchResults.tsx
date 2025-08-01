import type { PaginationProps, ResultsProps } from '@/types/types';
import { type JSX } from 'react';
import Spinner from '../shared/ui/Spinner';
import CardList from './CardList';
import Pagination from './Pagination';

const SearchResults = (props: ResultsProps & PaginationProps): JSX.Element => {
  const { items, isLoading, error, searchQuery, page, totalPages, onPageChange } = props;

  const isEmpty = items.length === 0;

  if (isLoading) return <Spinner />;

  if (error) return <p>{error}</p>;

  if (isEmpty)
    return (
      <p role="alert" className="text-center text-[18px]">
        Nothing found matching &quot;{searchQuery}&quot;
      </p>
    );

  return (
    <section aria-label="search results" className="flex flex-col gap-10 sm:pb-10 pb-5">
      <CardList items={items} />
      <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
    </section>
  );
};

export default SearchResults;
