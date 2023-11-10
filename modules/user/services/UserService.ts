import axios from '@/lib/axios'
import { UserVm } from '@/modules/user/models/UserVm'

export const getUser = async (userId: string): Promise<UserVm> => {
  const res = await axios.get('/api/users/' + userId)

  if (res.status >= 200 && res.status < 300) return res.data

  return Promise.reject(res)
}
