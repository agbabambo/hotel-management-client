import { Role } from '@/types/role'
import { Sex } from './Sex'

export type User = {
  id: string
  name?: string
  email: string
  emailVerified?: Date
  image?: string
  // password?: string
  role: Role
  firstName?: string
  lastName?: string
  sex: Sex
  birthday?: Date
  addressId: string
}
