import { RoomType } from '@/shared/types/RoomType'
import { Amenity } from '@/shared/types/Amenity'
import { AmenityHotel } from '@/shared/types/Amenity_Hotel'
import { Hotel } from '@/shared/types/Hotel'
import { Address } from '@/shared/types/Address'

export type HotelVm = Hotel & {
  address: Address
  roomTypes: RoomType[]
  amenity_Hotels: (AmenityHotel & { amenity: Amenity })[]
}
