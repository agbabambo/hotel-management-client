import { RoomStatus } from './RoomStatus'

export type Room = {
  id: string
  name: string
  status: RoomStatus
  isArchived: boolean
  createdAt: Date
  updatedAt: Date
  roomTypeId: string
}
