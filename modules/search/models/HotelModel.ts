import { RoomType } from '@/shared/types/RoomType'
import { Address } from './AddressModel'
import { Amenity } from '@/shared/types/Amenity'
import { AmenityHotel } from '@/shared/types/Amenity_Hotel'

export type HotelVm = {
  id: string
  name: string
  description: string
  images: string[]
  address?: Address
  roomTypes: RoomType[]
  amenity_Hotels: (AmenityHotel & { amenity: Amenity })[]
}
