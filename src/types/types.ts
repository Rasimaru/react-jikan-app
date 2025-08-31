import type { Dispatch } from 'react';

export type CountryData = {
  year: number;
  population?: number;
  co2?: number;
  co2PerCapita?: number;
  [key: string]: number | undefined;
};

export type CountryProps = {
  country: string;
  isoCode?: string;
  data: CountryData[];
};

export type ControlsProps = {
  countries: CountryProps[];
  selectedYear: number | null;
  onYearChange: (year: number) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  setFilteredCountries: Dispatch<React.SetStateAction<CountryProps[]>>;
  selectedColumns: string[];
  setSelectedColumns: (cols: string[]) => void;
  openModal: () => void;
};

export type DetailsProps = {
  country: CountryProps;
  selectedYear: number | null;
  selectedColumns?: string[];
};

export type RawCountryData = {
  year: number | string;
  population?: number | string;
  co2?: number | string;
  co2_per_capita?: number | string;
  [key: string]: unknown;
};

export type RawCountryProps = {
  iso_code?: string;
  data: RawCountryData[];
};

export type ResultsProps = {
  countries: CountryProps[];
  selectedCountry: string | null;
  setSelectedCountry: (country: string) => void;
  selectedYear: number | null;
  selectedColumns: string[];
};

export type SortField = 'name' | 'population';
export type SortOrder = 'asc' | 'desc';

export type ModalProps = {
  onClose: () => void;
  selectedColumns?: string[];
  onChange?: (cols: string[]) => void;
};
