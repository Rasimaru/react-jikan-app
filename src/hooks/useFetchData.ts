import { useEffect, useState } from 'react';
import { fetchData } from '@/services/api';
import type { CardItem } from '@/types/types';

const useFetchData = (query: string, page: number) => {
  const [items, setItems] = useState<CardItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setItems([]);
    setIsLoading(true);
    setError(null);

    fetchData(query, page)
      .then((data) => {
        setTotalPages(data.pagination.last_visible_page);
        setItems(data.data);
      })
      .catch((error: Error) => {
        console.error('Fetch results error', error);
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  }, [query, page]);

  return { items, isLoading, error, totalPages };
};

export default useFetchData;
