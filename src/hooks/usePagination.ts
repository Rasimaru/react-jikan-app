import useUrlParams from './useUrlParams';

const usePagination = () => {
  const { getParam, setParams } = useUrlParams();
  const currentPage = Number(getParam('page')) || 1;

  const changePage = (newPage: number): void => {
    if (newPage > 0) {
      setParams({ page: newPage.toString() });
    }
  };

  return { currentPage, changePage };
};

export default usePagination;
