import { format } from 'date-fns'
import Client from './components/client'
import { Column } from './components/columns'
import { getCurrentUserBooking } from '@/modules/booking/services/BookingService'
import { getAuthSession } from '@/lib/auth'

const BookingPage = async () => {
  const session = await getAuthSession()

  const bookings = await getCurrentUserBooking(session?.user.id!)

  // const formattedBookings: Column[] = bookings.map((item) => ({
  //   id: item.id,
  //   startDate: format(item.startDate, 'MMMM do, yyyy'),
  //   endDate: format(item.endDate, 'MMMM do, yyyy'),
  //   roomName: item.booking_rooms.map((b) => b.room.name).join(', '),
  //   createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  //   price: item.booking_rooms.reduce((c, a) => a.room.roomType.price + c, 0),
  // }))

  // return (
  //   <div className='container p-10'>
  //     <Client data={formattedBookings} />
  //   </div>
  // )

  return <div>Hi there</div>
}

export default BookingPage
