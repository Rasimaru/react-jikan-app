import React from 'react';
import type { CardListProps } from '@/types/types';
import Card from './Card';

const CardList = (props: CardListProps): React.JSX.Element => {
  const { items } = props;

  return (
    <section className="grid gap-4 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
      {items.map((item, index) => (
        <Card key={`${item.mal_id}-${index}`} item={item} />
      ))}
    </section>
  );
};

export default CardList;
