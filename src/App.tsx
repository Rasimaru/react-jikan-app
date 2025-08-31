import { useEffect, useState, type JSX } from 'react';
import { ResultsControls } from '@/components/ResultsControls';
import { ResultsList } from '@/components/ResultsList';
import { ModalAddColumns } from '@/components/ModalAddColumns';
import { getData } from './lib/getData';
import type { CountryProps } from './types/types';

export default function App(): JSX.Element {
  const [filteredCountries, setFilteredCountries] = useState<CountryProps[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(new Date().getFullYear() - 2);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const countries: CountryProps[] = getData();

  useEffect(() => {
    setFilteredCountries(countries);
  }, []);

  const toggleModal = (): void => {
    setIsModalOpen((isModalOpen) => !isModalOpen);
  };

  return (
    <div className="container p-4 mx-auto">
      <ResultsControls
        countries={countries}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        setFilteredCountries={setFilteredCountries}
        selectedColumns={selectedColumns}
        setSelectedColumns={setSelectedColumns}
        openModal={toggleModal}
      />

      {isModalOpen && (
        <ModalAddColumns
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
      />
    </div>
  );
}
