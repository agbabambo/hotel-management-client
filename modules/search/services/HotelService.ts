import axios from '@/lib/axios'
import { Hotel } from '../models/HotelModel'
import { Address } from '../models/AddressModel'

export const getHotels = async (
  location: string
): Promise<(Hotel & { address: Address })[]> => {
  const res = await axios.get('/api/hotels?q=' + location)

  if (res.status >= 200 && res.status < 300) return res.data

  return Promise.reject(res)
}
