import React from 'react';
import type { CardProps } from '@/types/types';
import { StarIcon } from 'lucide-react';

const Card = (props: CardProps): React.JSX.Element => {
  const { title, year, images, score, mal_id } = props.item;

  return (
    <div
      aria-label={`Card about ${title}`}
      className="hover:scale-102 hover:cursor-pointer duration-300"
      onClick={() => props.onClick(mal_id)}
    >
      <div className="flex flex-col border-1 rounded-xl overflow-clip relative h-full">
        <div className="aspect-[3/4] relative">
          <img
            alt={title}
            loading="lazy"
            src={images?.webp?.large_image_url}
            className="absolute w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col grow gap-1 p-3 self-start justify-between text-left">
          <h3 className="font-medium text-sm line-clamp-2">{title}</h3>
          <p className="text-xs text-muted-foreground">{year ?? 'TBD'}</p>
        </div>
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs flex items-center">
          <StarIcon className="h-3 w-3 mr-1 text-yellow-400 fill-yellow-400"></StarIcon>
          <span>{score}</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Card);
