import { Booking } from './Booking'
import { Room } from './Room'

export type Booking_Room = {
  roomId: string
  room: Room
  bookingId: string
  booking: Booking
}
