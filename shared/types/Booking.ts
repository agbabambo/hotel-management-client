import { User } from './User'

export type Booking = {
  id: string
  startDate: Date
  endDate: Date
  roomCharge: number
  paymentId: string
  numAdults: number
  numKids: number
  createdAt: Date
  updatedAt: Date

  userId: String
  user: User
}
