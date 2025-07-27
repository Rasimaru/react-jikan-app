import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get('page')) || 1;

  const [page, setPage] = useState(pageParam);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams({ page: '1' });
    }
  }, []);

  useEffect(() => {
    if (page !== pageParam) {
      setPage(pageParam);
    }
  }, [pageParam]);

  const goToPage = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setPage(pageNum);
      setSearchParams({ page: pageNum.toString() });
    }
  };

  return {
    page,
    totalPages,
    setTotalPages,
    goToPage
  };
};

export default usePagination;
