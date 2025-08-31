import type { DetailsProps } from '@/types/types';
import { useEffect, useState, type JSX } from 'react';

export function ResultsDetails(props: DetailsProps): JSX.Element {
  const { country, selectedYear, selectedColumns = [] } = props;
  const [highlighted, setHighlighted] = useState<number | null>(null);

  const filteredData = selectedYear
    ? country.data.filter((d) => d.year === selectedYear)
    : country.data;

  useEffect(() => {
    if (selectedYear) {
      setHighlighted(selectedYear);
      const timer = setTimeout(() => setHighlighted(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedYear]);

  return (
    <div className="p-2 bg-gray-50 text-center">
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border px-2 py-1">Year</th>
            <th className="border px-2 py-1">Population</th>
            <th className="border px-2 py-1">CO₂</th>
            <th className="border px-2 py-1">CO₂ per Capita</th>
            {selectedColumns.map((col) => (
              <th key={col} className="border px-2 py-1">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((entry) => (
            <tr key={entry.year} className={`${highlighted ? 'bg-blue-200' : ''}`}>
              <td className="border px-2 py-1">{entry.year}</td>
              <td className="border px-2 py-1">{entry.population ?? 'N/A'}</td>
              <td className="border px-2 py-1">{entry.co2?.toFixed(3) ?? 'N/A'}</td>
              <td className="border px-2 py-1">{entry.co2PerCapita?.toFixed(3) ?? 'N/A'}</td>
              {selectedColumns.map((col) => (
                <td key={col} className="border px-2 py-1">
                  {entry[col]?.toFixed(3) ?? '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
