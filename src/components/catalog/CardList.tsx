import { type JSX } from 'react';
import type { CardListProps } from '@/types/types';
import Card from './Card';

const CardList = (props: CardListProps): JSX.Element => {
  const { items } = props;

  return (
    <section
      role="list"
      className="grid gap-4 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:pb-10 pb-5"
    >
      {items.map((item, index) => (
        <Card key={`${item.mal_id}-${index}`} item={item} />
      ))}
    </section>
  );
};

export default CardList;
