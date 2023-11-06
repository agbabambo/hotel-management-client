import type { Session, User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'

import { Role } from './role'

type UserId = string

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId
    role: Role
    name: string
    picture: string
    email: string
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: UserId
      role: Role
      name: string
      picture: string
      email: string
    }
  }
}
