import { create } from 'zustand'

export type Location = {
  name: string
  code: number
}

type ILocation = {
  location: Location
  setLocation: (data?: Location) => void
}

export const useLocation = create<ILocation>((set) => ({
  location: { name: '', code: -1 },
  setLocation: (data?: Location) => set(() => ({ location: data })),
}))
