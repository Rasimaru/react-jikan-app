import type { JSX } from 'react';

export type ResultsProps = {
  items: CardItem[];
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
};

export type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};

export type CardListProps = {
  items: CardItem[];
};

export type CardProps = {
  item: CardItem;
};

export type CardItem = {
  mal_id: number;
  title: string;
  year: number | null;
  images: {
    webp: {
      large_image_url: string;
    };
  };

  score: number;
  aired: {
    from: string;
  };
  synopsis: string;
  source: string;
  duration: string;
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
  pagination: {
    last_visible_page: number;
    current_page: number;
    has_next_page: boolean;
  };
  data: CardItem[];
};

export type JikanApiResponseId = {
  data: CardItem;
};

export type DetailsProps = {
  card: CardItem;
  onClose: () => void;
};

export type SelectedItem = {
  id: string;
  name: string;
  year: string;
  description: string;
  url: string;
};

export type SelectedState = {
  selectedItems: SelectedItem[];
};

export type Theme = 'light' | 'dark' | 'system';

export type ThemeState = {
  current: Theme;
};

export type ThemeOption = {
  value: Theme;
  label: string;
  icon: JSX.Element;
};
