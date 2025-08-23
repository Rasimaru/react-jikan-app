import { JSX } from 'react';
import Main from '@/components/main/Main';
import checkResponse from '@/utils/http/checkResponse';
import { JikanApiResponse, MainPageProps } from '@/types/types';
import { API } from '@/types/constants';

const MainPage = async ({ searchParams }: MainPageProps): Promise<JSX.Element> => {
  const params = await Promise.resolve(searchParams);
  const query = params.q || '';
  const page = 1;
  const url = query
    ? `${API.BASE}${API.SEARCH}?q=${encodeURIComponent(query)}&page=${page}`
    : `${API.BASE}${API.SEASONS}?page=${page}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  const data: JikanApiResponse = await checkResponse(res);

  return <Main initialData={data} initialPage={page} initialQuery={query} />;
};

export default MainPage;
