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
