import { RefreshCcw } from 'lucide-react';

type RefreshButtonProps = {
  onRefresh: () => void;
  isRefreshing: boolean;
};

const RefreshButton = (props: RefreshButtonProps) => {
  const { onRefresh, isRefreshing } = props;
  return (
    <div className="w-full">
      <button
        data-testid="RefreshBtn"
        disabled={isRefreshing}
        onClick={onRefresh}
        className="absolute left-0 sm:-top-15 -top-12.5 inline-flex justify-center items-center bg-amber-500 text-black py-2 px-3 hover:bg-amber-300 hover:cursor-pointer rounded duration-300 font-semibold text-base"
      >
        <RefreshCcw size={24} className="p-0.5 mr-1" />
        Refresh
      </button>
    </div>
  );
};
export default RefreshButton;
