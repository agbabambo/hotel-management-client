import axios from '@/lib/axios'
import { BookingModel } from '../models/BookingModel'

export async function getCurrentUserBooking(
  userId: string
): Promise<BookingModel[]> {
  const res = await axios.get('/bookings', {
    data: { userId },
  })

  if (res.status >= 200 && res.status < 300) return res.data

  return Promise.reject(res)
}
