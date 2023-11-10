import axios from '@/lib/axios'
import { RoomTypeVm } from '@/modules/reservation/models/RoomTypeVm'

export async function getRoomTypes(hotelId: string): Promise<RoomTypeVm[]> {
  const res = await axios.get('/api/roomTypes?&hotelId=' + hotelId)

  if (res.status >= 200 && res.status < 300) return res.data

  return Promise.reject(res)
}
