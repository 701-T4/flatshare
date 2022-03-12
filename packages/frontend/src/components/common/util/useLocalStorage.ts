import { useEffect } from 'react';

export const useLocalStorage = (
  key: string,
  action: (value?: string) => any,
  dependencies: any[] = [],
) => {
  useEffect(() => {
    const value = localStorage.getItem(key);
    if (value) {
      action(value);
    }
  }, [...dependencies]);
};
