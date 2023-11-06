import { create } from 'zustand'

interface IFirstLoad {
  isFirstLoad: boolean
  setIsFirstLoad: (val: boolean) => void
}

export const useFirstLoad = create<IFirstLoad>((set) => ({
  isFirstLoad: true,
  setIsFirstLoad: () => set(() => ({ isFirstLoad: false })),
}))
