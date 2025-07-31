import { useEffect, useState } from 'react';

const useLocalStorage = (key: string, initialValue: string) => {
  const getValue = (key: string): string => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? storedValue : initialValue;
    } catch (error) {
      console.error(`Can't read value from local storage ${key}`, error);
      return initialValue;
    }
  };

  const [value, setValue] = useState(() => getValue(key));

  useEffect(() => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Can't set value to local storage ${key}`, error);
    }
  }, [key, value]);

  return [value, setValue] as const;
};

export default useLocalStorage;
