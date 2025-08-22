'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearAll } from '@/store/selectedSlice';
import { BrushCleaning, Download, PanelLeftOpen, PanelRightOpen } from 'lucide-react';
import { useState, type JSX } from 'react';
import { saveAs } from 'file-saver';
import downloadCsvServer from '@/server/downloadCsvServer';
import { useTranslations } from 'next-intl';

const Flyout = (): JSX.Element | null => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.selected.selectedItems);
  const [open, setOpen] = useState(false);

  const t = useTranslations('Flyout');

  const handleClear = () => {
    dispatch(clearAll());
  };

  const handleDownload = async () => {
    const csvContent = await downloadCsvServer(selectedItems);

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${selectedItems.length}_items.csv`);
  };

  if (selectedItems.length === 0) return null;

  return (
    <div className="fixed left-5 bottom-5 z-50 bg-white dark:bg-neutral-800 border rounded-xl shadow-lg flex items-center overflow-hidden transition-all duration-300">
      <div className="flex items-center px-3 border-r min-h-11 text-sm font-medium whitespace-nowrap">
        {t('elem', { count: selectedItems.length })}
      </div>
      {!open && (
        <button
          data-testid="extender"
          onClick={() => setOpen(true)}
          aria-label="Open Flyout"
          className="flex items-center justify-center min-h-11 min-w-11 hover:bg-amber-300 text-black bg-amber-500 hover:cursor-pointer duration-300"
        >
          <PanelLeftOpen size={22} />
        </button>
      )}
      <div
        data-testid="flyoutControls"
        className={`flex items-center transition-all duration-500 overflow-hidden 
          ${open ? 'w-auto opacity-100 scale-100' : 'w-0 opacity-0 scale-95'}`}
      >
        <button
          type="button"
          data-testid="remover"
          onClick={handleClear}
          aria-label="Clear selection"
          className="p-3 hover:bg-amber-300 hover:dark:text-black transition border-r hover:cursor-pointer duration-300"
        >
          <BrushCleaning size={20} />
        </button>
        <button
          data-testid="downloader"
          onClick={handleDownload}
          aria-label="Download CSV"
          className={`p-3 hover:bg-amber-300 hover:dark:text-black transition border-r hover:cursor-pointer duration-300 ${open ? 'visible' : 'invisible'}`}
        >
          <Download size={20} />
        </button>
        <button
          data-testid="shortener"
          onClick={() => setOpen(false)}
          aria-label="Close Flyout"
          className="flex items-center justify-center min-h-11 min-w-11 hover:bg-amber-300 text-black bg-amber-500 hover:cursor-pointer duration-300"
        >
          <PanelRightOpen size={22} />
        </button>
      </div>
    </div>
  );
};

export default Flyout;
