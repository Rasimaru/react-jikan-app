import { useSearchParams } from 'react-router';

const useUrlParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = (key: string): string | null => searchParams.get(key);

  const setParams = (entries: Record<string, string>, options?: { replace?: boolean }) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(entries).forEach(([key, value]) => {
      params.set(key, value);
    });
    setSearchParams(params, options);
  };

  const deleteParam = (key: string, options?: { replace?: boolean }) => {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    setSearchParams(params, options);
  };

  return { getParam, setParams, deleteParam };
};
export default useUrlParams;
