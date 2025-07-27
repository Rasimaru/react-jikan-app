import { useEffect, useState } from 'react';

const useLocalStorage = (key: string, value: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      return localStorage.getItem(key) ?? value;
    } catch (error) {
      console.warn(`Can't get value from Local Storage for ${key}:`, error);
      return value;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, storedValue);
    } catch (error) {
      console.warn(`Can't set value to Local Storage for ${key}:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
};

export default useLocalStorage;
