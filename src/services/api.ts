import { API_SEARCH, API_TOP_AIRING } from '@/types/constants';
import { type JikanApiResponse, type JikanApiResponseId } from '@/types/types';
import checkResponse from '@/utils/http/checkResponse';

const getSeasonTop = async (page: number): Promise<JikanApiResponse> => {
  const url = `${API_TOP_AIRING}&page=${page}`;

  const res: Response = await fetch(url);
  const data: JikanApiResponse = await checkResponse(res);
  return data;
};

const searchAnime = async (query: string, page: number = 1): Promise<JikanApiResponse> => {
  const url: string = `${API_SEARCH}?q=${encodeURIComponent(query)}&page=${page}`;

  const res: Response = await fetch(url);
  const data: JikanApiResponse = await checkResponse(res);
  return data;
};

const fetchData = async (query: string, page: number = 1): Promise<JikanApiResponse> => {
  return query.length ? searchAnime(query, page) : getSeasonTop(page);
};

const fetchDataWithId = async (id: number): Promise<JikanApiResponseId> => {
  const url = `${API_SEARCH}${id}`;

  const res = await fetch(url);
  const data: JikanApiResponseId = await checkResponse(res);
  return data;
};

export { fetchData, fetchDataWithId };
