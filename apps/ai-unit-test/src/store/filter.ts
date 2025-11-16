import { create } from 'zustand';
import { ALL_CATEGORY_ID } from '@/constants';

type FilterState = {
  minPrice: number | string | null;
  maxPrice: number | string | null;
  title: string | null;
  categoryId: number;
  setMinPrice: (minPrice: number | string | null) => void;
  setMaxPrice: (maxPrice: number | string | null) => void;
  setTitle: (title: string | null) => void;
  setCategoryId: (categoryId: number) => void;
  initFilter: () => void;
};

export const useFilterStore = create<FilterState>(set => ({
  minPrice: null,
  maxPrice: null,
  title: null,
  categoryId: ALL_CATEGORY_ID,
  setMinPrice: minPrice => set(state => ({ ...state, minPrice })),
  setMaxPrice: maxPrice => set(state => ({ ...state, maxPrice })),
  setTitle: title => set(state => ({ ...state, title })),
  setCategoryId: categoryId => set(state => ({ ...state, categoryId })),
  initFilter: () =>
    set(() => ({
      minPrice: null,
      maxPrice: null,
      title: null,
      categoryId: -1,
    })),
}));


