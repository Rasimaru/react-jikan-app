import type { DetailsProps } from '@/types/types';
import { type JSX } from 'react';

const CardDetails = (props: DetailsProps): JSX.Element => {
  const { card, onClose } = props;
  return (
    <>
      <div className="flex flex-col relative">
        <button
          onClick={onClose}
          className="absolute inline-flex self-end bg-amber-500 text-black border-0 py-1.5 px-3 focus:outline-none hover:bg-amber-300 hover:cursor-pointer rounded text-base font-semibold duration-300 z-10"
        >
          Close
        </button>
        <div className="flex min-[450px]:flex-row flex-col gap-5 justify-center w-full h-full items-center">
          <div className="basis-1/3 aspect-[3/4] max-[450px]:w-full min-[450px]:min-h-[250px] relative">
            <img
              alt={card?.title}
              loading="lazy"
              src={card?.images?.webp?.large_image_url}
              className="absolute w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-5 text-[18px] w-full h-full min-[450px]:pt-10">
            <h3 className="text-2xl text-start font-bold">{card?.title}</h3>
            <div className="flex flex-col justify-between text-start">
              <p className="flex">
                <span className="min-w-20">Duration:</span> {card?.duration}
              </p>
              <p className="flex">
                <span className="min-w-20">Source:</span> {card?.source}
              </p>
              <p className="flex">
                <span className="min-w-20">Year:</span> {card?.year}
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="grow text-[15px] text-justify">{card?.synopsis}</p>
    </>
  );
};
export default CardDetails;
