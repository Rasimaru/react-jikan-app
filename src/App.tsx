import { useCallback, useMemo, useState, type JSX } from 'react';
import ResultsControls from '@/components/ResultsControls';
import ResultsList from '@/components/ResultsList';
import ColumnsModal from './components/ColumnsModal';
import { getData } from './lib/getData';
import type { CountryProps, SortField, SortOrder } from './lib/types';
import { LAST_YEAR } from './lib/constants';

export default function App(): JSX.Element {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(LAST_YEAR);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const countries: CountryProps[] = getData();

  const filteredCountries = useMemo(() => {
    let result = countries;

    if (searchQuery.trim()) {
      result = result.filter((country) =>
        country.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    result = [...result].sort((a, b) => {
      if (sortField === 'name') {
        return sortOrder === 'asc'
          ? a.country.localeCompare(b.country)
          : b.country.localeCompare(a.country);
      } else {
        const popA = a.data.find((data) => data.year === selectedYear)?.population ?? 0;
        const popB = b.data.find((data) => data.year === selectedYear)?.population ?? 0;
        return sortOrder === 'asc' ? popA - popB : popB - popA;
      }
    });

    return result;
  }, [countries, searchQuery, selectedYear, sortField, sortOrder]);

  const toggleModal = useCallback((): void => {
    setIsModalOpen((isModalOpen) => !isModalOpen);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleYearChange = useCallback((year: number | null) => {
    setSelectedYear(year);
  }, []);

  const handleSortChange = useCallback(
    (field: SortField) => {
      if (field === sortField) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setSortField(field);
        setSortOrder('asc');
      }
    },
    [sortField, sortOrder]
  );

  return (
    <div className="container p-4 mx-auto">
      <ResultsControls
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        openModal={toggleModal}
      />

      {isModalOpen && (
        <ColumnsModal
          selectedColumns={selectedColumns}
          onChange={setSelectedColumns}
          onClose={toggleModal}
        />
      )}

      <ResultsList
        countries={filteredCountries}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedYear={selectedYear}
        selectedColumns={selectedColumns}
        sortField={sortField}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />
    </div>
  );
}
