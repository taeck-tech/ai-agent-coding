import { apiRoutes } from '@/apiRoutes';
import { useLoadMore } from '@/helpers/reactQuery';
import { pathToUrl } from '@/helpers/url';
import { Product } from '@/pages/home/components/ProductCard';

type UseProductsParams = {
  limit: number;
  params: {
    categoryId: number;
    title: string | null;
    minPrice: number | string | null;
    maxPrice: number | string | null;
  };
};

type ProductsPage = {
  products: Product[];
  lastPage?: boolean;
};

type UseProductsResult = {
  data?: { pages: ProductsPage[] };
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
};

const useProducts = (options: UseProductsParams): UseProductsResult =>
  useLoadMore({ url: pathToUrl(apiRoutes.products), options }) as UseProductsResult;

export default useProducts;


