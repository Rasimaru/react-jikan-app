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
  year: number | null;
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
  pagination: {
    last_visible_page: number;
    current_page: number;
    has_next_page: boolean;
  };
};

export type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (pageNum: number) => void;
};
