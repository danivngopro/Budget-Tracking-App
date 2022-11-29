import { useEffect, useState } from "react";

export default function useLocalStorage(key: string, defaultValue: any) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue !== null && jsonValue !== undefined && jsonValue !== "undefined") {
      return JSON.parse(jsonValue);
    }
    if (typeof defaultValue === "function") {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  

  return [value, setValue]
}
