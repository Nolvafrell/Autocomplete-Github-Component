import { useEffect, useState } from "react";

type TUseDebounce = (value: string, delay: number) => string;

export const useDebounce: TUseDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
