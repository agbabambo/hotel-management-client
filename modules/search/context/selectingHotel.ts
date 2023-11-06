import { create } from 'zustand'

type Hotel = {
  name: string
  code: number
}

type ISelectingHotel = {
  hotel: Hotel
  setHotel: (data: Hotel) => void
}

export const useSelectingHotel = create<ISelectingHotel>((set) => ({
  hotel: { name: '', code: -1 },
  setHotel: (data: Hotel) => set(() => ({ hotel: data })),
}))
