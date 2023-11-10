import { Amenity } from '@/shared/types/Amenity'
import { Amenity_RoomType } from '@/shared/types/Amenity_RoomType'
import { Discount } from '@/shared/types/Discount'
import { Hotel } from '@/shared/types/Hotel'
import { Room } from '@/shared/types/Room'
import { RoomType } from '@/shared/types/RoomType'

export type RoomTypeVm = RoomType & {
  rooms: Room[]
  hotel: Hotel
  discount: Discount
  amenity_RoomTypes: (Amenity_RoomType & { amenity: Amenity })[]
}
