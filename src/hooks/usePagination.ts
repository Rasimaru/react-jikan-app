import { useSearchParams } from 'react-router';

const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const changePage = (newPage: number): void => {
    if (newPage > 0) {
      const params = new URLSearchParams(searchParams);
      params.set('page', newPage.toString());
      setSearchParams(params);
    }
  };

  return { currentPage, changePage };
};

export default usePagination;
