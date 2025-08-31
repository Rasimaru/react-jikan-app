import type { CountryProps, CountryData, RawCountryProps } from '@/types/types';

let cache: CountryProps[] | null = null;
let pending: Promise<void> | null = null;

export function getData(): CountryProps[] {
  if (cache) return cache;

  if (!pending) {
    pending = fetch('/owid-co2-data.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load CO2 data');
        return res.json();
      })
      .then((rawData: Record<string, RawCountryProps>) => {
        cache = Object.entries(rawData).map(([countryName, countryValues]) => {
          const data: CountryData[] = countryValues.data.map((entry) => {
            const { year, population, co2, co2_per_capita, ...rest } = entry;
            const extraFields: Record<string, number> = {};

            Object.entries(rest).forEach(([key, value]) => {
              if (typeof value === 'number') {
                extraFields[key] = value;
              }
            });

            return {
              year: Number(year),
              population: population != null ? Number(population) : undefined,
              co2: co2 != null ? Number(co2) : undefined,
              co2PerCapita: co2_per_capita != null ? Number(co2_per_capita) : undefined,
              ...extraFields
            };
          });

          return {
            country: countryName,
            isoCode: countryValues.iso_code,
            data
          };
        });
      });
  }

  throw pending;
}
