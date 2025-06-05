import { useEffect } from 'react';
import { useLocation } from 'react-router';

export const useTitle = (title: string) => {
  const location = useLocation();

  useEffect(() => {
    document.title = `${title} / X`;
  }, [title, location.pathname]);
};
