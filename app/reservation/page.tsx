import { redirect } from 'next/navigation'

import { getAuthSession } from '@/lib/auth'
import Reservation from '@/modules/reservation/components/Reservation'
import { getRoomTypes } from '@/modules/reservation/services/ReservationService'

const ReservationPage = async ({}) => {
  const session = await getAuthSession()

  const roomTypes = await getRoomTypes()

  if (!session?.user.id) redirect('/sign-in')

  return (
    <>
      <Reservation initialData={roomTypes} userId={session?.user.id} />
    </>
  )
}

export default ReservationPage
