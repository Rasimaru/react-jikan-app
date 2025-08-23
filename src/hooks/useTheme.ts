import ThemeContext from '@/context/ThemeContext';
import type { ThemeContextType } from '@/types/types';
import { useContext } from 'react';

const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
};

export default useTheme;
