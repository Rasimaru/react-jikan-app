'use client';

import { type JSX } from 'react';
import type { CardProps } from '@/types/types';
import { LucideCheckCircle, LucideCircle, StarIcon } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addSelected, removeSelected } from '@/store/selectedSlice';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const Card = (props: CardProps): JSX.Element => {
  const { mal_id, title, year, images, score, synopsis } = props.item;

  const dispatch = useAppDispatch();
  const isSelected = useAppSelector((state) =>
    state.selected.selectedItems.some((item) => item.id === mal_id.toString())
  );

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  params.set('details', mal_id.toString());

  const handleCheckboxChange = () => {
    const item = {
      id: mal_id.toString(),
      name: title,
      year: year?.toString() ?? 'TBD',
      description: synopsis,
      url: images.webp.large_image_url
    };
    if (isSelected) {
      dispatch(removeSelected(item.id));
    } else {
      dispatch(addSelected(item));
    }
  };

  return (
    <Link
      href={`?${params.toString()}`}
      aria-label={`View details for ${title}`}
      role="listitem"
      className="hover:scale-102 duration-300 rounded-xl max-[450]:max-w-[300px]"
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
        <div className="p-2 min-w-[100px] rounded-md bg-black/70 text-white flex items-center justify-between bg-muted/20 absolute top-0 left-0">
          <label
            role="checkbox"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 text-sm cursor-pointer"
          >
            <input type="checkbox" hidden checked={isSelected} onChange={handleCheckboxChange} />
            {isSelected ? <LucideCheckCircle data-testid={'CheckedIcon'} /> : <LucideCircle />}
            {isSelected ? 'Selected' : 'Select'}
          </label>
        </div>
      </div>
    </Link>
  );
};

export default Card;
