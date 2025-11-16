import { api } from '@/helpers/axios';

export const defaultFetcher = ({
  queryKey,
  pageParam,
}: {
  queryKey: readonly [string, Record<string, unknown> | undefined];
  pageParam?: Record<string, unknown>;
}) => {
  const [url, params] = queryKey;

  return api.get<{ [key: string]: unknown }>(url, { params: { ...params, ...pageParam } }).then(res => {
    return res.data;
  });
};

export const defaultDeleteFunc =
  (url: string) =>
  (id: string | number) =>
    api.delete(`${url}/${id}`);
export const defaultPostFunc =
  (url: string) =>
  <TData = unknown>(data: TData) =>
    api.post(url, data);


