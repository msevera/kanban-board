import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, timeout: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, timeout);

    return () => {
      clearTimeout(timer);
    }
  }, [value, timeout]);

  return debouncedValue;
}