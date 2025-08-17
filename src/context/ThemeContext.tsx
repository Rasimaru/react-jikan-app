'use client';

import useLocalStorage from '@/hooks/useLocalStorage';
import type { Theme, ThemeContextType } from '@/types/types';
import { createContext, useEffect, type ReactNode } from 'react';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'system');

  const applyTheme = (mode: 'light' | 'dark') => {
    const root = document.documentElement;
    root.classList.toggle('dark', mode === 'dark');
    root.classList.toggle('light', mode === 'light');
  };

  useEffect(() => {
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemChange = (e?: MediaQueryListEvent) => {
      const isDark = e ? e.matches : systemPreference.matches;
      applyTheme(isDark ? 'dark' : 'light');
    };

    if (theme === 'system') {
      handleSystemChange();
      systemPreference.addEventListener('change', handleSystemChange);
      setTheme(theme);
      return () => systemPreference.removeEventListener('change', handleSystemChange);
    } else {
      applyTheme(theme);
    }
    setTheme(theme);
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setTheme }}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
