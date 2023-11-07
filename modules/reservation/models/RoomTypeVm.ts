import { HotelVm } from '@/modules/search/models/HotelModel'
import { Discount } from '@/shared/types/Discount'
import { Room } from '@/shared/types/Room'
import { RoomType } from '@/shared/types/RoomType'

export type RoomTypeVm = RoomType & {
  rooms: Room[]
  hotel: HotelVm
  discount: Discount
}
