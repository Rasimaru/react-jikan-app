import { JSX } from 'react';
import Main from '@/components/main/Main';
import { generateStaticParams } from '@/utils/utils';
import { JikanApiResponse } from '@/types/types';
import checkResponse from '@/utils/http/checkResponse';

export { generateStaticParams };

const MainPage = async (): Promise<JSX.Element> => {
  const page = 1;
  const res = await fetch(`https://api.jikan.moe/v4/seasons/now?&page=${page}`, {
    next: { revalidate: 3600 }
  });
  const data: JikanApiResponse = await checkResponse(res);

  return <Main initialData={data} initialPage={page} />;
};

export default MainPage;
