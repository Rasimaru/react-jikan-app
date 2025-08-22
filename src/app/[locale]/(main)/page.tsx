import { JSX } from 'react';
import Main from '@/components/main/Main';
import checkResponse from '@/utils/http/checkResponse';
import { JikanApiResponse } from '@/types/types';
import { API } from '@/types/constants';

const MainPage = async (): Promise<JSX.Element> => {
  const page = 1;
  const res = await fetch(`${API.SEASONS}?&page=${page}`, {
    next: { revalidate: 3600 }
  });
  const data: JikanApiResponse = await checkResponse(res);

  return <Main initialData={data} initialPage={page} />;
};

export default MainPage;
