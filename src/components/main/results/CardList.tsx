import { type JSX } from 'react';
import type { CardListProps } from '@/types/types';
import Card from './Card';

const CardList = (props: CardListProps): JSX.Element => {
  const { items } = props;

  return (
    <div
      role="list"
      className="grid gap-4 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 min-[450px]:grid-cols-2"
    >
      {items.map((item, index) => (
        <Card key={`${item.mal_id}-${index}`} item={item} />
      ))}
    </div>
  );
};

export default CardList;
