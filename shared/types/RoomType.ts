export type RoomType = {
  id: string
  name: string
  description: string
  images: string[]
  occupancy: number
  numBeg: number
  price: number
  maxBookingDay: number
  isArchived: boolean
  createdAt: Date
  updatedAt: Date
  hotelId: string
  discountId: string | null
}
