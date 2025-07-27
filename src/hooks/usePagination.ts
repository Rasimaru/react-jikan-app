import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = useMemo(() => {
    return Number(searchParams.get('page')) || 1;
  }, [searchParams]);

  const [page, setPage] = useState(pageParam);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams({ page: '1' });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (page !== pageParam) {
      setPage(pageParam);
    }
  }, [page, pageParam]);

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
