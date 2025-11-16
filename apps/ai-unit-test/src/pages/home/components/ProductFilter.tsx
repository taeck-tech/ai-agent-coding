import { Box, Skeleton } from '@mui/material';
import React, { Suspense } from 'react';

import ApiErrorBoundary from '@/pages/common/components/ApiErrorBoundary';
import CategoryRadioGroup from '@/pages/home/components/CategoryRadioGroup';
import PriceRange from '@/pages/home/components/PriceRange';
import SearchBar from '@/pages/home/components/SearchBar';
import { useFilterStore } from '@/store/filter';
import { debounce, pick } from '@/utils/common';

type ProductFilterBoxProps = {
  children: React.ReactNode;
};

const ProductFilterBox: React.FC<ProductFilterBoxProps> = ({ children }) => (
  <Box sx={{ padding: '10px 0' }}>{children}</Box>
);

const ProductFilter: React.FC = () => {
  const { categoryId, setCategoryId, setMaxPrice, setMinPrice, setTitle } =
    useFilterStore(state =>
      pick(
        state,
        'categoryId',
        'setMinPrice',
        'setMaxPrice',
        'setTitle',
        'setCategoryId',
      ),
    ) as {
      categoryId: number;
      setMinPrice: (v: number | string | null) => void;
      setMaxPrice: (v: number | string | null) => void;
      setTitle: (v: string | null) => void;
      setCategoryId: (v: number) => void;
    };

  // Debounce 원본 함수는 JS이므로 반환 핸들러에 명시적 타입을 부여한다.
  const debouncedSetTitle = debounce((value: string) => {
    setTitle(value);
  }, 300);
  const debouncedSetMinPrice = debounce((value: string) => {
    setMinPrice(value);
  }, 300);
  const debouncedSetMaxPrice = debounce((value: string) => {
    setMaxPrice(value);
  }, 300);

  const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = ev => {
    debouncedSetTitle(ev.target.value);
  };
  const handleMinPrice: React.ChangeEventHandler<HTMLInputElement> = ev => {
    debouncedSetMinPrice(ev.target.value);
  };
  const handleMaxPrice: React.ChangeEventHandler<HTMLInputElement> = ev => {
    debouncedSetMaxPrice(ev.target.value);
  };
  const handleChangeCategory: React.ChangeEventHandler<HTMLInputElement> = ev => {
    const value = typeof ev.target.value === 'string' ? Number(ev.target.value) : ev.target.value;
    setCategoryId(value as number);
  };

  return (
    <Box sx={{ padding: '10px' }}>
      <ProductFilterBox>
        <SearchBar onChangeInput={handleChangeInput} />
      </ProductFilterBox>
      <ProductFilterBox>
        <ApiErrorBoundary>
          <Suspense fallback={<Skeleton height="100px" />}>
            <CategoryRadioGroup
              categoryId={categoryId}
              onChangeCategory={handleChangeCategory}
            />
          </Suspense>
        </ApiErrorBoundary>
      </ProductFilterBox>
      <ProductFilterBox>
        <PriceRange
          onChangeMinPrice={handleMinPrice}
          onChangeMaxPrice={handleMaxPrice}
        />
      </ProductFilterBox>
    </Box>
  );
};

export default ProductFilter;


