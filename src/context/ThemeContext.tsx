import type { Theme, ThemeContextType } from '@/types/types';
import { createContext, useEffect, useState, type ReactNode } from 'react';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const getInitialTheme = (): Theme => {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) return saved;
    return 'system';
  };

  const [theme, setThemeState] = useState<Theme>(getInitialTheme());

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
      localStorage.setItem('theme', theme);
      return () => systemPreference.removeEventListener('change', handleSystemChange);
    } else {
      applyTheme(theme);
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
