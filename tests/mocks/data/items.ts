import type { CardItem } from '@/types/types';

export const mockItem = {
  mal_id: 1,
  title: 'Test Anime',
  year: 2025,
  images: {
    webp: {
      large_image_url: 'url'
    }
  },
  score: 1.25,
  synopsis: 'lorem',
  source: 'manga',
  duration: '22 minutes'
} as CardItem;

export const mockPagination = {
  last_visible_page: 2,
  current_page: 1,
  has_next_page: true
};

export const mockItems = [
  { mal_id: 1, title: 'Card 1', score: 1, images: { webp: { large_image_url: 'url1' } } },
  { mal_id: 2, title: 'Card 2', score: 2, images: { webp: { large_image_url: 'url2' } } },
  { mal_id: 3, title: 'Card 3', score: 3, images: { webp: { large_image_url: 'url3' } } }
] as CardItem[];
