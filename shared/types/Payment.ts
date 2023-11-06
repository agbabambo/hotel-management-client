import { Booking } from './Booking'
import { User } from './User'

export type Payment = {
  id: string
  roomCharge: number
  createdAt: Date
  updatedAt: Date
  userId: string
  user: User
  bookingId: string
  booking: Booking
}
