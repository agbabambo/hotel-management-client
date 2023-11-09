import { getServerSession } from 'next-auth'

export const getAuthSession = () =>
  getServerSession({
    session: { strategy: 'jwt' },
    callbacks: {
      async session({ token, session }) {
        if (token) {
          session.user.id = token.id
          session.user.name = token.name
        }
        return session
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  })
