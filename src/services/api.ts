import { API_SEARCH, API_TOP_AIRING } from '@/types/constants';
import { type JikanApiResponse } from '@/types/types';
import checkResponse from '@/utils/http/checkResponse';

const getTop = async (): Promise<JikanApiResponse> => {
  const res: Response = await fetch(API_TOP_AIRING);
  const data: JikanApiResponse = await checkResponse(res);
  return data;
};

const searchAnime = async (query: string): Promise<JikanApiResponse> => {
  const url: string = `${API_SEARCH}?q=${encodeURIComponent(query)}`;

  const res: Response = await fetch(url);
  const data: JikanApiResponse = await checkResponse(res);
  return data;
};

const fetchData = async (query: string): Promise<JikanApiResponse> => {
  return query.length ? searchAnime(query) : getTop();
};

export default fetchData;
