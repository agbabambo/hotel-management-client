import axios from '@/lib/axios'
import { FeedbackVm } from '@/modules/feedback/models/FeedbackVm'

export async function getUserFeedback(userId: string): Promise<FeedbackVm[]> {
  const res = await axios.get('/api/feedbacks?userId=' + userId)

  if (res.status >= 200 && res.status < 300) return res.data

  return Promise.reject(res)
}
