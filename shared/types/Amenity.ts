import { Amenity_RoomType } from './Amenity_RoomType'

export type Amenity = {
  id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date

  amenity_RoomTypes: Amenity_RoomType[]
}
