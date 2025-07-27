import { useEffect, useState } from 'react';
import type { CardItem, DetailsProps } from '@/types/types';
import Spinner from '../layout/Spinner';
import { API_SEARCH } from '@/types/constants';

const CardDetails = ({ id, onClose }: DetailsProps) => {
  const [item, setItem] = useState<CardItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`${API_SEARCH}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data.data);
        setVisible(true);
      })
      .catch(() => setItem(null))
      .finally(() => setLoading(false));

    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, [id]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <>
      <div
        data-testid="overlay"
        onClick={handleClose}
        className="fixed top-0 left-0 w-full h-full bg-black opacity-70 z-40"
      ></div>
      {loading || !item ? (
        <Spinner />
      ) : (
        <div
          className={`flex flex-col gap-4 fixed top-0 h-screen md:w-1/2 sm:w-2/3 right-0 bg-white dark:bg-neutral-800 shadow-lg p-4 z-50 transform transition-transform duration-300 ${visible ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex">
            <div className="basis-1/3 aspect-[3/4] relative">
              <img
                alt={item.title}
                loading="lazy"
                src={item.images?.webp?.large_image_url}
                className="absolute w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-5 basis-2/3 text-[18px] px-4">
              <button
                onClick={handleClose}
                className="inline-flex self-end bg-amber-300 text-black border-0 py-1.5 px-3 focus:outline-none hover:bg-gray-200 hover:cursor-pointer rounded text-base font-semibold duration-300"
              >
                Close
              </button>
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <div className="flex flex-col justify-between text-start">
                <p className="flex">
                  <span className="basis-1/3">Duration:</span> {item.duration}
                </p>
                <p className="flex">
                  <span className="basis-1/3">Source:</span> {item.source}
                </p>
                <p className="flex">
                  <span className="basis-1/3">Year:</span> {item.year}
                </p>
              </div>
            </div>
          </div>
          <p className="text-[15px] overflow-ellipsis ">{item.synopsis}</p>
        </div>
      )}
    </>
  );
};

export default CardDetails;
