import axios from '@/lib/axios'
import { BookingVm } from '@/modules/booking/models/BookingModel'

export async function getCurrentUserBooking(
  userId: string
): Promise<BookingVm[]> {
  const res = await axios.get('/api/bookings?userId=' + userId)

  if (res.status >= 200 && res.status < 300) return res.data

  return Promise.reject(res)
}
