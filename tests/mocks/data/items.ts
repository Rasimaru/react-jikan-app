import type { CardItem } from '@/types/types';

export const mockItem = {
  mal_id: 1,
  title: 'Test Anime',
  score: 1.25,
  images: {
    webp: {
      large_image_url: 'url'
    }
  },
  year: 2025
} as CardItem;

export const mockItems = [
  { mal_id: 1, title: 'Card 1', score: 1, images: { webp: { large_image_url: 'url1' } } },
  { mal_id: 2, title: 'Card 2', score: 2, images: { webp: { large_image_url: 'url2' } } },
  { mal_id: 3, title: 'Card 3', score: 3, images: { webp: { large_image_url: 'url3' } } }
] as CardItem[];
