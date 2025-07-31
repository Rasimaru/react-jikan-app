import type { ResultsProps } from '@/types/types';
import type { JSX } from 'react';
import Spinner from '../shared/ui/Spinner';
import CardList from './CardList';

const SearchResults = (props: ResultsProps): JSX.Element => {
  const { items, isLoading, error, searchQuery } = props;

  const isEmpty = items.length === 0;

  if (isLoading) return <Spinner />;

  if (error) return <p>{error}</p>;

  if (isEmpty)
    return (
      <p role="alert" className="text-center text-[18px]">
        Nothing found matching &quot;{searchQuery}&quot;
      </p>
    );

  return <CardList items={items} />;
};

export default SearchResults;
