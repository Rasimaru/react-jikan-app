import { useEffect, useState } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const getValue = (key: string): T => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        return JSON.parse(storedValue) as T;
      }
    } catch (error) {
      console.error(`Can't read value from local storage ${key}`, error);
    }
    return initialValue;
  };

  const [value, setValue] = useState(() => getValue(key));

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Can't set value to local storage ${key}`, error);
    }
  }, [key, value]);

  return [value, setValue] as const;
};

export default useLocalStorage;
