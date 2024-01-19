import categoryApi from "@/apis/categoryApi";
import { create } from "zustand";

interface CategoryState {
  categoryInfo: Category | undefined;
  getBaseCategory: () => void;
}

export const useCategory = create<CategoryState>()((set) => ({
  categoryInfo: undefined,
  getBaseCategory: async () => {
    const response = await categoryApi.getBaseCategories();
    if (response.data.status === "OK")
      return set(() => ({ categoryInfo: response.data }));
  },
}));
