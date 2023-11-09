import { Address } from '@/modules/search/models/AddressModel'
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
  // TODO: fix later
  address: Address
  role: Role
  firstName: string
  lastName: string
  sex: 'MALE' | 'FEMALE' | 'UNKNOWN'
  birthday: Date

  bookings: Booking[]
  votes: Vote[]
  payments: Payment[]
}
