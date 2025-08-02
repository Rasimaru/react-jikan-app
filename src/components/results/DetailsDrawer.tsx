import { useEffect, useState, type JSX } from 'react';

import useUrlParams from '@/hooks/useUrlParams';

import { fetchDataWithId } from '@/services/api';
import { type CardItem } from '@/types/types';
import CardDetails from './CardDetails';
import Spinner from '../shared/ui/Spinner';

const DetailsDrawer = (props: { id: number }): JSX.Element => {
  const [card, setCard] = useState<CardItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const { deleteParam } = useUrlParams();
  const { id } = props;

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    setError(null);
    const timeout = setTimeout(() => setVisible(true), 300);

    fetchDataWithId(+id)
      .then((data) => {
        setCard(data.data);
      })
      .catch((error: Error) => {
        console.error('Fetch details error', error);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
        document.body.classList.add('overflow-hidden');
      });

    return () => {
      document.body.classList.remove('overflow-hidden');
      clearTimeout(timeout);
    };
  }, [id]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      deleteParam('details', { replace: true });
    }, 300);
  };

  return (
    <>
      <div
        data-testid="overlay"
        onClick={handleClose}
        className={`${id ? 'fixed' : 'hidden'} top-0 left-0 w-full h-full bg-black opacity-70 z-40`}
      ></div>
      <section
        className={`flex flex-col gap-4 fixed top-0 h-full lg:w-1/2 sm:w-2/3 right-0 bg-white dark:bg-neutral-800 shadow-lg p-4 z-50 transform transition-transform duration-300 overflow-y-scroll ${visible ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {isLoading && <Spinner />}
        {error && <p>{error}</p>}
        {!isLoading && !error && card && <CardDetails card={card} onClose={handleClose} />}
      </section>
    </>
  );
};

export default DetailsDrawer;
