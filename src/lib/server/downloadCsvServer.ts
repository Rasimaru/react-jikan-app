'use server';

import type { SelectedItem } from '@/types/types';

export default async function downloadCsvServer(selectedItems: SelectedItem[]) {
  const csvHeader = ['ID', 'Name', 'Year', 'Description', 'URL']
    .map((field) => `"${field.replace(/"/g, '""')}"`)
    .join(';');

  const csvRows = selectedItems.map((item) =>
    [item.id, item.name, item.year, item.description, item.url]
      .map((field) => `"${field.replace(/"/g, '""')}"`)
      .join(';')
  );

  return [csvHeader, ...csvRows].join('\n');
}
