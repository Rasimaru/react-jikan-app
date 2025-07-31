import type { ReactNode } from 'react';

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

export type SearchProps = {
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

export type FallbackProps = {
  onReset: () => void;
};

export type JikanApiResponse = {
  data: CardItem[];
};
