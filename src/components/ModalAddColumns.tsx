import type { ModalProps } from '@/types/types';
import { useState, type JSX } from 'react';

const AVAILABLE_FIELDS = [
  'methane',
  'methane_per_capita',
  'nitrous_oxide',
  'temperature_change_from_co2',
  'oil_co2',
  'total_ghg',
  'land_use_change_co2'
];

export function ModalAddColumns(props: ModalProps): JSX.Element {
  const { onClose, selectedColumns = [], onChange } = props;
  const [columns, setColumns] = useState<string[]>(selectedColumns);

  const toggleColumn = (column: string) => {
    if (columns.includes(column)) {
      setColumns(columns.filter((col) => col !== column));
    } else {
      setColumns([...columns, column]);
    }
  };

  const handleSave = () => {
    if (onChange) onChange(columns);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-96">
        <h2 className="text-lg font-bold mb-2">Add Columns</h2>
        <div className="flex flex-col gap-1 max-h-60 overflow-auto">
          {AVAILABLE_FIELDS.map((col) => (
            <label key={col} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={columns.includes(col)}
                onChange={() => toggleColumn(col)}
              />
              {col}
            </label>
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-3 py-1 rounded cursor-pointer hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-300 hover:text-black"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
