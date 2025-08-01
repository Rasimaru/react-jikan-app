import type { PaginationProps } from '@/types/types';
import type { JSX } from 'react';

const Pagination = (props: PaginationProps): JSX.Element => {
  const { page, totalPages, onPageChange } = props;

  const handlePageChange = (nextPage: number) => {
    if (nextPage > 0 && nextPage <= totalPages) {
      onPageChange(nextPage);
    }
  };

  return (
    <div className="flex justify-center items-center gap-5 text-lg">
      <button
        aria-label="Previous page"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
        className="inline-flex items-center bg-amber-500 text-black border-0 py-1.5 px-5 focus:outline-none hover:bg-amber-300 hover:cursor-pointer rounded font-semibold duration-300 disabled:bg-gray-100 disabled:cursor-default"
      >
        Prev
      </button>

      <span>
        {page} / {totalPages}
      </span>

      <button
        aria-label="Next page"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
        className="inline-flex items-center bg-amber-500 text-black border-0 py-1.5 px-5 focus:outline-none hover:bg-amber-300 hover:cursor-pointer rounded font-semibold duration-300 disabled:bg-gray-100 disabled:cursor-default"
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;
