import { useEffect, useState } from "react";

type TUseDebounce = (
  value: string | undefined,
  delay: number,
) => string | undefined;

export const useDebounce: TUseDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState<string | undefined>(
    value,
  );

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
