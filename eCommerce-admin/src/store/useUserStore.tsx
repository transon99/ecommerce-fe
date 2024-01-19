import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  access_token: string
  refresh_token: string
  setAccessToken: (access_token: string) => void
  setRefreshToken: (refresh_token: string) => void
}

export const useUserStore = create<State>()(
  persist(
    (set, get) => ({
      access_token: '',
      refresh_token: '',
      // currentUser: null,
      setAccessToken: (token: string) => set(() => ({ access_token: token })),
      setRefreshToken: (token: string) => set(() => ({ refresh_token: token }))
    }),
    {
      name: 'userStore'
    }
  )
)
