import axios from '@/lib/axios'
import { User } from '@/shared/types/User'

export const getUser = async (userId: string): Promise<User> => {
  const res = await axios.get('/users/' + userId)

  if (res.status >= 200 && res.status < 300) return res.data

  return Promise.reject(res)
}
