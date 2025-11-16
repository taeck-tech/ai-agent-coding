import { apiRoutes } from '@/apiRoutes';
import { useFetch } from '@/helpers/reactQuery';
import { pathToUrl } from '@/helpers/url';

export type Category = {
  id: number;
  name: string;
};

type UseCategoriesOptions = {
  config?: unknown;
};

type UseCategoriesResult = {
  data?: Category[];
};

const useCategories = (options?: UseCategoriesOptions): UseCategoriesResult =>
  useFetch({
    url: pathToUrl(apiRoutes.categories),
    options,
  }) as UseCategoriesResult;

export default useCategories;


