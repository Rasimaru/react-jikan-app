import { Fragment, useEffect, useState, memo, type JSX } from 'react';
import type { ResultsProps } from '@/lib/types';
import ResultsDetails from './ResultsDetails';
import { ArrowDown, ArrowUp } from 'lucide-react';

const ResultsList = memo(function ResultsList(props: ResultsProps): JSX.Element {
  const {
    countries,
    selectedCountry,
    setSelectedCountry,
    selectedYear,
    selectedColumns,
    sortField,
    sortOrder,
    onSortChange
  } = props;

  const [highlighted, setHighlighted] = useState<number | null>(null);

  useEffect(() => {
    if (selectedYear) {
      setHighlighted(selectedYear);
      const timer = setTimeout(() => setHighlighted(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedYear]);

  return (
    <table className="border-collapse border w-full text-left">
      <thead>
        <tr>
          <th
            className="cursor-pointer px-2 py-1 hover:bg-blue-500 hover:text-white duration-300"
            onClick={() => onSortChange('name')}
          >
            <div className="flex gap-2">
              Name {sortField === 'name' ? sortOrder === 'asc' ? <ArrowUp /> : <ArrowDown /> : ''}
            </div>
          </th>
          <th
            className="cursor-pointer px-2 py-1 border text-center hover:bg-blue-500 hover:text-white duration-300"
            onClick={() => onSortChange('population')}
          >
            <div className="flex gap-2 justify-center">
              Population{' '}
              {sortField === 'population' ? sortOrder === 'asc' ? <ArrowUp /> : <ArrowDown /> : ''}
            </div>
          </th>
          <th className="px-2 py-1 border-b text-center">ISO</th>
        </tr>
      </thead>
      <tbody>
        {countries.map((country) => {
          const isOpen = selectedCountry === country.country;
          const population =
            country.data.find((data) => data.year === selectedYear)?.population ?? 'N/A';

          return (
            <Fragment key={country.country}>
              <tr
                className="hover:bg-blue-500 hover:text-white duration-300 cursor-pointer border"
                onClick={() => setSelectedCountry(isOpen ? '' : country.country)}
              >
                <td className="px-2 py-1 border">{country.country}</td>
                <td className={`px-2 py-1 text-center ${highlighted ? 'bg-blue-200' : ''}`}>
                  {population}
                </td>
                <td className="px-2 py-1 text-center border">{country.isoCode ?? 'N/A'}</td>
              </tr>
              {isOpen && (
                <tr>
                  <td colSpan={3} className="bg-gray-50 px-2 py-1">
                    <ResultsDetails
                      country={country}
                      selectedYear={selectedYear}
                      selectedColumns={selectedColumns}
                    />
                  </td>
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
});

export default ResultsList;
