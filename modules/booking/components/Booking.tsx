'use client'

import { FC, useEffect, useState } from 'react'
import { BookingVm } from '../models/BookingModel'
import Client from './client'
import { format, parseISO } from 'date-fns'
import { getCurrentUserBooking } from '../services/BookingService'
import { Column } from './columns'

interface BookingProps {
  userId: string
}

const Booking: FC<BookingProps> = ({ userId }) => {
  const [bookings, setBookings] = useState<BookingVm[]>([])

  useEffect(() => {
    getCurrentUserBooking(userId).then((data) => {
      setBookings(data)
    })
  }, [userId])

  console.log(bookings)
  if (!bookings) return

  const formattedBookings: Column[] = bookings.map((item) => {
    console.log(item)
    return {
      id: item.id,
      startDate: format(new Date(item.startDate), 'MMMM do, yyyy'),
      endDate: format(new Date(item.endDate), 'MMMM do, yyyy'),
      roomName: item.booking_rooms.map((b) => b.room.name).join(', '),
      roomCharge: item.roomCharge,
    }
  })

  if (!userId) return

  return (
    <div className='container p-10 mt-14'>
      <Client data={formattedBookings} />
    </div>
  )
}

export default Booking
