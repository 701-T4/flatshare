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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]);
};
