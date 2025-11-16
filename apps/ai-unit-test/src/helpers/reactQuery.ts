import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseInfiniteQueryResult,
  QueryKey,
} from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { TOAST_ID } from '@/constants';
import {
  defaultDeleteFunc,
  defaultFetcher,
  defaultPostFunc,
} from '@/helpers/fetcher';

type FetchOptions = {
  params?: Record<string, unknown>;
  config?: Record<string, unknown>;
};

// https://github.com/horprogs/react-query/blob/master/src/utils/reactQuery.ts

export const useFetch = <TData = unknown>({
  url,
  options,
}: {
  url: string;
  options?: FetchOptions;
}): UseQueryResult<TData, Error> => {
  const context = useQuery<TData, Error>(
    [url, options?.params] as QueryKey,
    ({ queryKey }) => defaultFetcher({ queryKey: queryKey as readonly [string, Record<string, unknown> | undefined] }),
    {
      enabled: !!url,
      useErrorBoundary: true,
      onError: (error: Error) => {
        console.error(error, 'error');
        return toast.error(`Something went wrong: ${error.message}`, {
          id: TOAST_ID,
        });
      },
      ...(options?.config ?? {}),
    },
  );

  return context;
};

export const useLoadMore = <TPage = unknown>({
  url,
  options,
}: {
  url: string;
  options: { limit: number; params?: Record<string, unknown> };
}): UseInfiniteQueryResult<TPage, Error> => {
  const { params, ...others } = options;
  const context = useInfiniteQuery<TPage, Error>(
    [url, params] as QueryKey,
    ({ queryKey, pageParam = 0 }) =>
      defaultFetcher({
        queryKey: queryKey as readonly [string, Record<string, unknown> | undefined],
        pageParam: { offset: (pageParam as number) * others.limit, limit: others.limit },
      }),
    {
      getNextPageParam: (lastPage: unknown, pages: unknown[]) => {
        // lastPage가 객체이고 lastPage.lastPage가 true일 때 없는 것으로 간주
        return (lastPage as { lastPage?: boolean } | undefined)?.lastPage ? false : pages.length;
      },
    },
  );

  return context;
};

const useGenericMutation = <TData = unknown>({
  func,
  url,
  params,
  updater,
}: {
  func: (data: TData) => Promise<unknown>;
  url: string;
  params?: Record<string, unknown>;
  updater?: (oldData: unknown, data: TData) => unknown;
}) => {
  const queryClient = useQueryClient();

  return useMutation(func, {
    onMutate: async data => {
      await queryClient.cancelQueries([url, params] as QueryKey);
      const previousData = queryClient.getQueryData([url, params] as QueryKey);

      queryClient.setQueryData([url, params] as QueryKey, oldData =>
        updater ? updater(oldData, data as TData) : data,
      );

      return previousData;
    },
    onError: async (_err, _data, context) => {
      queryClient.setQueryData([url, params] as QueryKey, context);
    },
    onSettled: () => {
      queryClient.invalidateQueries([url, params] as QueryKey);
    },
  });
};

export const useDelete = ({
  url,
  params,
  updater,
}: {
  url: string;
  params?: Record<string, unknown>;
  updater?: (oldData: unknown, data: unknown) => unknown;
}) => useGenericMutation({ func: defaultDeleteFunc(url), url, params, updater });

export const usePost = ({
  url,
  params,
  updater,
}: {
  url: string;
  params?: Record<string, unknown>;
  updater?: (oldData: unknown, data: unknown) => unknown;
}) => useGenericMutation({ func: defaultPostFunc(url), url, params, updater });

export const useUpdate = ({
  url,
  params,
  updater,
}: {
  url: string;
  params?: Record<string, unknown>;
  updater?: (oldData: unknown, data: unknown) => unknown;
}) => useGenericMutation({ func: defaultPostFunc(url), url, params, updater });


