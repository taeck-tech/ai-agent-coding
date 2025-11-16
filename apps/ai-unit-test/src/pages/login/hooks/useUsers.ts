import { apiRoutes } from '@/apiRoutes';
import { useFetch } from '@/helpers/reactQuery';
import { pathToUrl } from '@/helpers/url';

export type User = {
  id: number;
  name: string;
  email: string;
  password?: string;
};

type UseUsersResult = {
  data?: { users: User[] };
  isLoading?: boolean;
  isRefetching?: boolean;
};

const useUsers = (options?: unknown): UseUsersResult =>
  useFetch({ url: pathToUrl(apiRoutes.users), options }) as UseUsersResult;

export default useUsers;


