import type { ReactNode } from 'react';

export type AppState = {
  items: CardItem[];
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
};

export type CardListProps = {
  items: CardItem[];
};

export type CardProps = {
  item: CardItem;
};

export type CardItem = {
  title: string;
  year: number;
  images: {
    webp: {
      large_image_url: string;
    };
  };
  mal_id: number;
  score: number;
  aired: {
    from: string;
  };
};

export type LayoutProps = {
  children: ReactNode;
};

export type HeroProps = {
  onSearch: (query: string) => void;
  searchQuery: string;
};

export type SearchBarProps = {
  onSearch: (query: string) => void;
  searchQuery: string;
};

export type BoundaryProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export type BoundaryState = {
  hasError: boolean;
};

export type ErrorButtonState = {
  shouldThrow: boolean;
};

export type JikanApiResponse = {
  data: CardItem[];
};
