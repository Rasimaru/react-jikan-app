import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import Hero from './components/hero/Hero';
import CardList from './components/catalog/CardList';
import type { CardItem, JikanApiResponse } from './types/types';
import Spinner from './components/layout/Spinner';
import { API_SEARCH, API_TOP_AIRING } from './types/constants';
import checkResponse from './services/checkResponse';
import useLocalStorage from './hooks/useLocalStorage';
import Pagination from './components/catalog/Pagination';
import usePagination from './hooks/usePagination';

const App = () => {
  const [items, setItems] = useState<CardItem[]>([]);
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { page, totalPages, setTotalPages, goToPage } = usePagination();

  useEffect(() => {
    fetchData(searchQuery);
  }, [searchQuery, page]);

  function fetchData(query: string): void {
    const url =
      query !== ''
        ? `${API_SEARCH}?q=${encodeURIComponent(query)}&page=${page}`
        : `${API_TOP_AIRING}&page=${page}`;
    setIsLoading(true);
    setError(null);

    fetch(url)
      .then(checkResponse<JikanApiResponse>)
      .then((res) => {
        setTotalPages(res.pagination.last_visible_page);
        setItems(res.data);
      })
      .catch((error: Error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  }

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
    goToPage(1);
  };

  const isEmpty = items.length === 0;

  return (
    <Layout>
      <Hero onSearch={handleSearch} searchQuery={searchQuery}></Hero>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p>{`${error}`}</p>
      ) : isEmpty ? (
        <p className="text-center text-[18px]">Nothing found matching &quot;{searchQuery}&quot;</p>
      ) : (
        <>
          <CardList items={items} />
          <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
        </>
      )}
    </Layout>
  );
};

export default App;
