import { Booking } from '@/shared/types/Booking'
import { Booking_Room } from '@/shared/types/Booking_Room'
import { Room } from '@/shared/types/Room'
import { RoomType } from '@/shared/types/RoomType'

export type BookingModel = Booking & {
  booking_rooms: (Booking_Room & {
    room: Room & { roomType: RoomType }
    booking: Booking
  })[]
}
