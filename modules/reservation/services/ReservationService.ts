import axios from '@/lib/axios'

import { RoomTypeModel } from '../models/RoomTypeVm'

export async function getRoomTypes(hotelId: string): Promise<RoomTypeModel[]> {
  const res = await axios.get('/api/roomTypes?&hotelId=' + hotelId)

  if (res.status >= 200 && res.status < 300) return res.data

  return Promise.reject(res)
}
