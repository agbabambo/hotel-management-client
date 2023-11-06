import { Booking_Room } from './Booking_Room'
import { RoomStatus } from './RoomStatus'
import { RoomType } from './RoomType'
import { Vote } from './Vote'

export type Room = {
  id: string
  name: string
  status: RoomStatus
  isArchived: boolean
  createdAt: Date
  updatedAt: Date
  roomTypeId: string
  roomType: RoomType
  booking_rooms: Booking_Room[]
  votes: Vote[]
}
