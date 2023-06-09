import { useEffect, useState } from 'react';

const usePersistedState = (initialState, sessionStorageKey) => {
  const [state, setState] = useState(() => {
    const persistValue = sessionStorage.getItem(sessionStorageKey);

    return persistValue ? JSON.parse(persistValue) : initialState;
  });

  useEffect(() => {
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(state));
  }, [state, sessionStorageKey]);

  return [state, setState];
};

export const useSearchStr = () => {
  return usePersistedState(' ', 'searchString');
};
