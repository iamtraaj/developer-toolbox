/**
 * useLastTool — persists the last-visited tool path in localStorage
 * so we can restore it when the user returns.
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const STORAGE_KEY = 'devtoolbox:lastTool';

export function useLastTool() {
  const location = useLocation();

  useEffect(() => {
    // Only persist tool pages (not the root dashboard)
    if (location.pathname !== '/') {
      localStorage.setItem(STORAGE_KEY, location.pathname);
    }
  }, [location.pathname]);
}

export function getLastTool() {
  return localStorage.getItem(STORAGE_KEY) || '/';
}
