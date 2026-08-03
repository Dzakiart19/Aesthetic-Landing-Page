import { useEffect, useCallback, useRef } from 'react';

/**
 * Pushes multiple dummy history states as a buffer so the user cannot
 * leave with a single back press (e.g. after an ad redirect consumes one guard).
 *
 * Calls onBackAttempt whenever the user tries to navigate back.
 * Re-pushes guards after each back attempt so the trap stays active.
 * Also re-establishes guards when the page is restored from bfcache (pageshow).
 */

const GUARD_DEPTH = 5;

export function useBackGuard(onBackAttempt: () => void) {
  const isExiting = useRef(false);
  // Use a ref for the callback so we never need to re-register listeners
  const cbRef = useRef(onBackAttempt);
  cbRef.current = onBackAttempt;

  useEffect(() => {
    isExiting.current = false;

    const pushGuards = () => {
      for (let i = 0; i < GUARD_DEPTH; i++) {
        window.history.pushState({ exitGuard: true }, '');
      }
    };

    // Establish guards immediately on mount
    pushGuards();

    const onPopState = () => {
      if (isExiting.current) return;
      // Show dialog and immediately re-push guards
      cbRef.current();
      pushGuards();
    };

    // Re-establish guards when page is restored from bfcache
    // (user navigated away then pressed back — page is already in memory)
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted && !isExiting.current) {
        // Small delay so any associated popstate fires first,
        // then we top up the guard stack
        setTimeout(pushGuards, 80);
      }
    };

    window.addEventListener('popstate', onPopState);
    window.addEventListener('pageshow', onPageShow);

    return () => {
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, []); // intentionally empty — uses refs for callback

  const confirmExit = useCallback(() => {
    // Mark exiting so popstate handler does not fire during the back navigation
    isExiting.current = true;
    // go(-100) goes to the very beginning of session history;
    // browsers clamp automatically so it never throws.
    window.history.go(-100);
  }, []);

  return { confirmExit };
}
