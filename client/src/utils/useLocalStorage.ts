import React, { useCallback, useEffect, useState } from "react";

type SetValue<T> = React.Dispatch<React.SetStateAction<T>>;

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] => {
  const readValue = useCallback(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (e) {
      console.log(`Error LocalStorage : ${e}`);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};
