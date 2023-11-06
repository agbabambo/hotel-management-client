import { create } from 'zustand'
import { v4 as uuid } from 'uuid'

type IRoom = {
  id: string
  adults: number
  kids: number
  roomTypeId?: string | undefined
  isSelected?: boolean | undefined
}

interface IReservation {
  rooms: IRoom[]
  setRooms: (data: IRoom[]) => void
}

export const useReservation = create<IReservation>((set) => ({
  rooms: [{ adults: 1, kids: 0, id: uuid() }],
  setRooms: (rooms: IRoom[]) => set(() => ({ rooms: [...rooms] })),
}))
