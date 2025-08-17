import { JSX } from 'react';
import Main from '@/components/main/Main';
import { API_TOP_AIRING } from '@/types/constants';
import { JikanApiResponse } from '@/types/types';
import checkResponse from '@/utils/http/checkResponse';

const MainPage = async (): Promise<JSX.Element> => {
  const page = 1;
  const res = await fetch(`${API_TOP_AIRING}&page=${page}`, {
    next: { revalidate: 3600 }
  });
  const data: JikanApiResponse = await checkResponse(res);
  return <Main initialData={data} initialPage={page} />;
};

export default MainPage;
