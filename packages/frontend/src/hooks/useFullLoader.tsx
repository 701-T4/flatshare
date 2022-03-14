import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';

const LoaderCounterContext = createContext<{
  loadingCount: number;
  setLoadingCount: React.Dispatch<React.SetStateAction<number>>;
}>({
  loadingCount: 0,
  setLoadingCount: () => {},
});

export const LoadingCountContextProvider: FC = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);

  return (
    <LoaderCounterContext.Provider value={{ loadingCount, setLoadingCount }}>
      {children}
    </LoaderCounterContext.Provider>
  );
};

/**
 * Tool to render a full page loading screen if the passed in parameter is true,
 * or a function that resolves to true.
 *
 * @param isLoading pass in a boolean representing if there should be a full
 * page loading screen.
 */
export const useFullLoader = (isLoading: boolean | (() => boolean)) => {
  const loadingCount = useContext(LoaderCounterContext);

  useEffect(() => {
    let loading = false;
    if (typeof isLoading === 'function') {
      loading = isLoading();
    } else {
      loading = isLoading;
    }

    if (loading) {
      loadingCount.setLoadingCount((o) => o + 1);
      return () => loadingCount.setLoadingCount((o) => o - 1);
    }
  }, [isLoading, loadingCount]);
};

export const useIsLoading = () => useContext(LoaderCounterContext);

export default useFullLoader;
