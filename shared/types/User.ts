import { Booking } from './Booking'
import { Payment } from './Payment'
import { Vote } from './Vote'

export type User = {
  id: string
  name: string | null
  email: string
  emailVerified: Date | null
  image: string | null
  password: string | null
  phoneNumber: string | null
  address: string | null
  role: Role

  bookings: Booking[]
  votes: Vote[]
  payments: Payment[]
}
