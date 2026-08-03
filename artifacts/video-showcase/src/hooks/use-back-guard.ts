import { useEffect, useCallback } from 'react';

/**
 * Pushes a dummy history state on mount so the first "back" press
 * triggers a popstate event instead of leaving the site immediately.
 * Calls onBackAttempt when the user tries to go back.
 */
export function useBackGuard(onBackAttempt: () => void) {
  const pushDummy = useCallback(() => {
    window.history.pushState({ exitGuard: true }, '');
  }, []);

  useEffect(() => {
    pushDummy();

    const handlePopState = (e: PopStateEvent) => {
      // User pressed back — intercept and show dialog
      onBackAttempt();
      // Re-push the dummy state so the guard stays active
      pushDummy();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [onBackAttempt, pushDummy]);

  const confirmExit = useCallback(() => {
    // Remove the dummy state then go back for real
    window.history.go(-2);
  }, []);

  return { confirmExit };
}
