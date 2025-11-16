import { apiRoutes } from '@/apiRoutes';
import { usePost } from '@/helpers/reactQuery';
import { pathToUrl } from '@/helpers/url';

export const useLogin = (updater?: (oldData: unknown, newData: unknown) => unknown) =>
  usePost({ url: pathToUrl(apiRoutes.login), updater });


