import type { PaginationProps } from '@/types/types';

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="flex justify-center items-center gap-5 text-[20px]">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="inline-flex items-center bg-amber-300 text-black border-0 py-1.5 px-5 focus:outline-none hover:bg-gray-200 hover:cursor-pointer rounded font-semibold duration-300"
      >
        Prev
      </button>

      <span>
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="inline-flex items-center bg-amber-300 text-black border-0 py-1.5 px-5 focus:outline-none hover:bg-gray-200 hover:cursor-pointer rounded font-semibold duration-300"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
