import fetchData from '@/services/api';
import type { CardItem } from '@/types/types';
import { useEffect, useState } from 'react';

const useFetchData = (query: string) => {
  const [items, setItems] = useState<CardItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setItems([]);
    setIsLoading(true);
    setError(null);

    fetchData(query)
      .then((data) => setItems(data.data))
      .catch((error: Error) => {
        console.error('Fetch error', error);
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  }, [query]);

  return { items, isLoading, error };
};

export default useFetchData;
