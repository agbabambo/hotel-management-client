import { getServerSession } from 'next-auth'

export const getAuthSession = () =>
  getServerSession({
    session: { strategy: 'jwt' },
    callbacks: {
      async session({ token, session }) {
        if (token) {
          session.user.id = token.id
          session.user.role = token.role
          session.user.name = token.name
          session.user.picture = token.picture
          session.user.email = token.email
        }
        return session
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  })
