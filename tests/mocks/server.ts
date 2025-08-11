import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { mockItem, mockItems, mockPagination } from './data/items';

export const server = setupServer(
  http.get('https://api.jikan.moe/v4/anime', ({ request }) => {
    const query = new URL(request.url).searchParams.get('q');

    if (query === 'Test') {
      return HttpResponse.json({
        pagination: { ...mockPagination, last_visible_page: 1 },
        data: [mockItem]
      });
    }

    if (query === 'Bleach') {
      return HttpResponse.json({
        pagination: { ...mockPagination, last_visible_page: 1 },
        data: []
      });
    }

    return HttpResponse.json({ pagination: mockPagination, data: [] });
  }),

  http.get('https://api.jikan.moe/v4/top/anime', ({ request }) => {
    const query = new URL(request.url).searchParams.get('q');

    if (!query) {
      return HttpResponse.json({ pagination: mockPagination, data: mockItems });
    }
    if (query === 'Test') {
      return HttpResponse.json({
        pagination: { ...mockPagination, last_visible_page: 1 },
        data: [mockItem]
      });
    }
    if (query === 'Bleach') {
      return HttpResponse.json({
        pagination: { ...mockPagination, last_visible_page: 1 },
        data: []
      });
    }

    return HttpResponse.json({ pagination: mockPagination, data: [] });
  }),

  http.get('https://api.jikan.moe/v4/anime/:id', ({ params }) => {
    const { id } = params;

    if (id === '6669999') {
      return HttpResponse.json({ message: 'Resource does not exist' }, { status: 404 });
    }

    if (isNaN(Number(id))) {
      return HttpResponse.json({ message: 'Invalid id' }, { status: 400 });
    }

    return HttpResponse.json({ data: [] }, { status: 200 });
  })
);
