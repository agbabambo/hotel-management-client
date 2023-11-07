import { Amenity_RoomType } from './Amenity_RoomType'
import { Discount } from './Discount'
import { Room } from './Room'

export type RoomType = {
  id: string
  name: string
  description: string
  occupancy: number
  images: string[]
  price: number
  maxBookingDay: number
  isArchived: boolean
  createdAt: Date
  updatedAt: Date
  discountId: string | null
  discount: Discount | null
  rooms: Room[]
  amenity_RoomTypes: Amenity_RoomType[]
}
