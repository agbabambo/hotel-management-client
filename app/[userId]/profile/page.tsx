import { getAuthSession } from '@/lib/auth'
import prismadb from '@/lib/prismadb'
import { redirect } from 'next/navigation'
import Profile from '../../components/Profile'

const ProfilePage = async () => {
  const session = await getAuthSession()

  if (!session) redirect('/sign-in')

  const user = await prismadb.user.findUnique({
    where: { email: session.user.email! },
    include: { userInfo: true },
  })

  if (!user) redirect('/sign-in')

  return <Profile user={user} />
}

export default ProfilePage
