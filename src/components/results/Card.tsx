import { type JSX } from 'react';
import type { CardProps } from '@/types/types';
import { StarIcon } from 'lucide-react';
import { Link } from 'react-router';

const Card = (props: CardProps): JSX.Element => {
  const { mal_id, title, year, images, score } = props.item;

  return (
    <Link
      to={mal_id.toString()}
      aria-label={`View details for ${title}`}
      role="listitem"
      className="hover:scale-102 duration-300 rounded-xl max-w-[300px]"
    >
      <div className="flex flex-col border-1 rounded-xl overflow-clip relative h-full">
        <div className="aspect-[3/4] relative">
          <img
            alt={title}
            loading="lazy"
            src={images.webp.large_image_url}
            className="absolute w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col grow gap-1 p-3 self-start justify-between text-left">
          <h3 className="font-medium text-sm line-clamp-2">{title}</h3>
          <p className="text-xs text-muted-foreground">{year ?? 'TBD'}</p>
        </div>
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs flex items-center">
          <StarIcon
            aria-hidden="true"
            focusable="false"
            className="h-3 w-3 mr-1 text-yellow-400 fill-yellow-400"
          ></StarIcon>
          <span>{score}</span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
