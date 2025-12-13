'use client';

import { useState, useCallback, useEffect } from 'react';

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  autoFetch?: boolean;
}

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Custom hook for API calls with error handling
 * Automatically handles loading and error states
 */
export function useApi<T>(
  apiCall: () => Promise<T>,
  options: UseApiOptions = {}
) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null
  });

  const execute = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const data = await apiCall();
      setState(prev => ({ ...prev, data, loading: false }));
      options.onSuccess?.(data);
      return data;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({ ...prev, error: err, loading: false }));
      options.onError?.(err);
      throw err;
    }
  }, [apiCall, options]);

  useEffect(() => {
    if (options.autoFetch) {
      execute();
    }
  }, [options.autoFetch, execute]);

  return {
    ...state,
    execute,
    refetch: execute
  };
}

/**
 * Custom hook for paginated API calls
 */
export function usePaginatedApi<T>(
  apiCall: (page: number, limit: number) => Promise<{ data: T[]; total: number }>,
  initialPage: number = 1,
  initialLimit: number = 20
) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [allData, setAllData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async (p: number = page, l: number = limit) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall(p, l);
      setAllData(result.data);
      setTotal(result.total);
      setPage(p);
      setLimit(l);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [apiCall, page, limit]);

  useEffect(() => {
    execute(page, limit);
  }, []);

  const goToPage = (newPage: number) => {
    execute(newPage, limit);
  };

  const changeLimit = (newLimit: number) => {
    execute(1, newLimit);
  };

  const pages = Math.ceil(total / limit);

  return {
    data: allData,
    total,
    page,
    limit,
    pages,
    loading,
    error,
    goToPage,
    changeLimit,
    nextPage: () => goToPage(Math.min(page + 1, pages)),
    prevPage: () => goToPage(Math.max(page - 1, 1)),
    refetch: () => execute(page, limit)
  };
}
