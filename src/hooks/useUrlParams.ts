import { formatPathname } from '@/utils/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const useUrlParams = () => {
  const router = useRouter();
  const pathname = formatPathname(usePathname());
  const searchParams = useSearchParams();

  const getParam = (key: string): string | null => searchParams.get(key);

  const setParams = (entries: Record<string, string>, options?: { replace?: boolean }) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(entries).forEach(([key, value]) => {
      params.set(key, value);
    });
    const newUrl = `${pathname}?${params.toString()}`;
    if (options?.replace) {
      router.replace(newUrl);
    } else {
      router.push(newUrl);
    }
  };

  const deleteParam = (key: string, options?: { replace?: boolean }) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    const newUrl = `${pathname}?${params.toString()}`;
    if (options?.replace) {
      router.replace(newUrl);
    } else {
      router.push(newUrl);
    }
  };

  return { getParam, setParams, deleteParam };
};
export default useUrlParams;
