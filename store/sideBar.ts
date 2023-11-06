import { create } from 'zustand'

interface ISidebar {
  open: boolean
  setOpen: () => void
}

export const useSidebar = create<ISidebar>((set) => ({
  open: true,
  setOpen: () => set((state) => ({ open: !state.open })),
}))
