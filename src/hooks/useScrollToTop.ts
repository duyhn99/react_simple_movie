import { useEffect } from 'react';

const useScrollToTop = <T>(dependency: T): void => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dependency]);
};

export default useScrollToTop;
