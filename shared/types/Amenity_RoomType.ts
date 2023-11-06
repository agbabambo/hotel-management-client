import { Amenity } from './Amenity'
import { RoomType } from './RoomType'

export type Amenity_RoomType = {
  amenityId: string
  amenity: Amenity
  roomTypeId: string
  roomType: RoomType
}
