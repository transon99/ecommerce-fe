import categoryApi from '@/apis/categoryApi';
import { create } from 'zustand';

interface CategoryState {
  baseCategoryInfo: Category[] | undefined;
  getBaseCategory: () => void;
  setbaseCategoryInfo: (categories: Category[]) => void;
}

export const useCategory = create<CategoryState>()((set) => ({
  baseCategoryInfo: undefined,
  getBaseCategory: async () => {
    const response = await categoryApi.getBaseCategories();
    console.log('Base categories', response);
    if (response.status === 'OK')
      return set(() => ({ baseCategoryInfo: response.data }));
  },
  setbaseCategoryInfo: (categories: Category[]) =>
    set(() => ({ baseCategoryInfo: categories })),
}));
