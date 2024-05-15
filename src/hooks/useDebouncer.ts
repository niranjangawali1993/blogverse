import { useEffect } from 'react';

const useDebouncer = (func: any, searchField: string, delay: number = 1000) => {
  useEffect(() => {
    try {
      let debounceTimer: any;
      clearTimeout(debounceTimer);

      debounceTimer = setTimeout(() => {
        if (searchField) func(searchField);
      }, delay);

      return () => {
        clearTimeout(debounceTimer);
      };
    } catch (error) {
      console.log(error);
    }
  }, [searchField, delay]); // eslint-disable-line
};

export default useDebouncer;
