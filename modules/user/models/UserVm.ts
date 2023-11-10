import { Address } from '@/shared/types/Address'
import { User } from '@/shared/types/User'

export type UserVm = User & {
  address: Address
}
