import { HotelVm } from '@/modules/search/models/HotelModel'
import { create } from 'zustand'

type IHotel = {
  hotel?: HotelVm
  setHotel: (data?: HotelVm) => void
}

export const useHotel = create<IHotel>((set) => ({
  hotel: undefined,
  setHotel: (hotel?: HotelVm) => set(() => ({ hotel })),
}))
