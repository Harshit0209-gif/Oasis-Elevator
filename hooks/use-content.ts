import { useEffect, useState } from "react";

interface ContentState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/** Fetches once on mount. `deps` re-triggers the fetch, same as useEffect. */
export function useContent<T>(fetcher: () => Promise<T>, deps: unknown[] = []): ContentState<T> {
  const [state, setState] = useState<ContentState<T>>({ data: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    setState((prev) => ({ ...prev, loading: true }));

    fetcher()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((error: Error) => {
        if (!cancelled) setState({ data: null, loading: false, error });
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
