import axios from '@/lib/axios'
import { HotelVm } from '../models/HotelModel'
import { Address } from '../models/AddressModel'

export const getHotels = async (provinceCode: number): Promise<HotelVm[]> => {
  const res = await axios.get('/api/hotels?&p=' + provinceCode)

  if (res.status >= 200 && res.status < 300) return res.data

  return Promise.reject(res)
}

// TODO: okay, soon
export const getHotel = async (hotelId: string): Promise<HotelVm> => {
  const res = await axios.get('/api/hotels/' + hotelId)

  if (res.status >= 200 && res.status < 300) return res.data

  return Promise.reject()
}
