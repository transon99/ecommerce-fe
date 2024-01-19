import userApi from "@/apis/userApi";
import { create } from "zustand";

interface UserState {
  userInfo: UserInfo | undefined;
  getCurrentUser: () => void;
}

export const useUser = create<UserState>()((set) => ({
  userInfo: undefined,
  getCurrentUser: async () => {
    const response = await userApi.getCurrentUser();
    if (response.data.status === "OK")
      return set(() => ({ userInfo: response.data }));
  },
}));
