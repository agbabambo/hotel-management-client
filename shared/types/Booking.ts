import { User } from './User'

export type Booking = {
  id: string
  startDate: Date
  endDate: Date
  numAdults: number
  numKids: number
  createdAt: Date
  updatedAt: Date

  userId: String
  user: User
}
