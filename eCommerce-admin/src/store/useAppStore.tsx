import { create } from 'zustand'

interface useAppStoreProps {
  isShowSideBar: boolean
  setShowSideBar: () => void
}

export const useAppStore = create<useAppStoreProps>((set) => ({
  isShowSideBar: false,
  setShowSideBar: () => set((state) => ({ isShowSideBar: !state.isShowSideBar }))
}))
