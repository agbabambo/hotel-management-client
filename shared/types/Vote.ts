import { Room } from './Room'
import { User } from './User'

export type Vote = {
  id: string
  value: number
  createdAt: Date
  updatedAt: Date
  userId: string
  user: User
  roomId: string
  room: Room
}
