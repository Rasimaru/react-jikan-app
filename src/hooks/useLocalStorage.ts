'use client';

import { useEffect, useState } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        try {
          setValue(JSON.parse(storedValue) as T);
        } catch {
          setValue(storedValue as unknown as T);
        }
      }
    } catch (error) {
      console.error(`Can't read value from local storage ${key}`, error);
    }
  }, [key]);

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
