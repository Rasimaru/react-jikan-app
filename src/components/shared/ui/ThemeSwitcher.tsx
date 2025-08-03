import { useEffect, useState, type JSX } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTheme } from '@/store/themeSlice';
import { Laptop2, Moon, Sun } from 'lucide-react';
import type { Theme, ThemeOption } from '@/types/types';

const ThemeSwitcher = (): JSX.Element => {
  const theme = useAppSelector((state) => state.theme.current);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const options: ThemeOption[] = [
    { value: 'light', label: 'Light', icon: <Sun size={16} /> },
    { value: 'dark', label: 'Dark', icon: <Moon size={16} /> },
    { value: 'system', label: 'Auto', icon: <Laptop2 size={16} /> }
  ];

  const selected = options.find((opt) => opt.value === theme);

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (mode: 'light' | 'dark') => {
      root.classList.toggle('dark', mode === 'dark');
      root.classList.toggle('light', mode === 'light');
    };

    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemChange = (e?: MediaQueryListEvent) => {
      const isDark = e ? e.matches : systemPreference.matches;
      applyTheme(isDark ? 'dark' : 'light');
    };

    if (theme === 'system') {
      handleSystemChange();
      systemPreference.addEventListener('change', handleSystemChange);
      return () => systemPreference.removeEventListener('change', handleSystemChange);
    } else {
      applyTheme(theme);
    }
  }, [theme]);

  const handleChange = (theme: Theme) => {
    dispatch(setTheme(theme));
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left ">
      <button
        aria-label="Color theme switcher"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center gap-2 border w-10 h-10 rounded-md hover:cursor-pointer hover:bg-amber-300 hover:text-black duration-300"
      >
        {selected?.icon}
      </button>

      {open && (
        <div className="absolute right-0 z-10 bg-gray-100 dark:bg-neutral-900 mt-1 w-22 rounded shadow border">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleChange(opt.value)}
              className={`flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-amber-300 dark:hover:text-black hover:cursor-pointer duration-300 rounded ${
                opt.value === theme ? 'font-semibold' : ''
              }`}
            >
              {opt.icon}
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
