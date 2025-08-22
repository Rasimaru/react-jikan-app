import { API } from '@/types/constants';
import { type JikanApiResponse, type JikanApiResponseId } from '@/types/types';
import getErrorMessage from '@/utils/http/getErrorMessage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API.BASE,
    validateStatus(response, body: unknown) {
      if (response.ok) return true;

      const serverMessage =
        typeof body === 'object' && body !== null && 'message' in body
          ? (body as { message?: string }).message
          : undefined;

      throw new Error(serverMessage || getErrorMessage(response.status));
    }
  }),
  tagTypes: ['Anime'],
  endpoints: (builder) => ({
    getSeasonTop: builder.query<JikanApiResponse, number>({
      query: (page) => `${API.SEASONS}?page=${page}`,
      providesTags: ['Anime']
    }),
    getAnimeSearch: builder.query<JikanApiResponse, { query: string; page?: number }>({
      query: ({ query, page = 1 }) => `${API.SEARCH}?q=${encodeURIComponent(query)}&page=${page}`,
      providesTags: ['Anime']
    }),
    getAnimeById: builder.query<JikanApiResponseId, number>({
      query: (id) => API.ANIME_BY_ID(id),
      providesTags: (_result, _error, id) => [{ type: 'Anime', id }]
    }),

    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    refreshAnime: builder.mutation<null, void>({
      queryFn: async () => {
        return { data: null };
      },
      invalidatesTags: ['Anime']
    }),

    refreshAnimeById: builder.mutation<null, number>({
      queryFn: async () => {
        return { data: null };
      },
      invalidatesTags: (_result, _error, id) => [{ type: 'Anime', id }]
    })
  }),
  keepUnusedDataFor: 60,
  refetchOnFocus: true,
  refetchOnReconnect: true
});

export const {
  useGetSeasonTopQuery,
  useGetAnimeSearchQuery,
  useGetAnimeByIdQuery,
  useRefreshAnimeMutation,
  useRefreshAnimeByIdMutation
} = apiSlice;

export default apiSlice;
