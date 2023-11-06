import { Booking_Room } from '@/shared/types/Booking_Room'
import { Discount } from '@/shared/types/Discount'
import { Room } from '@/shared/types/Room'
import { RoomType } from '@/shared/types/RoomType'

export type RoomTypeModel = RoomType & {
  rooms: (Room & { booking_rooms: Booking_Room })[]
  discount: Discount
}
