import axios from '@/lib/axios'

import { RoomTypeModel } from '../models/RoomTypeModel'

export async function getRoomTypes(): Promise<RoomTypeModel[]> {
  const res = await axios.get('/api/roomTypes')

  if (res.status >= 200 && res.status < 300) return res.data

  return Promise.reject(res)
}
