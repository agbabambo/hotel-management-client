'use client'

import { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import * as queryConvert from '@/lib/query'
import SearchInfo from '@/modules/search-input/components/SearchInfo'
import SearchBar from '@/modules/search-input/components/searchBar'
import { useLocation } from '@/modules/search-input/context/location'
import { useDateRange } from '@/modules/search-input/context/dateRange'
import { useReservation } from '@/modules/search-input/context/reservation'
import { RoomTypeModel } from '@/modules/reservation/models/RoomTypeModel'
import { useFirstLoad } from '@/store/firstLoad'
import ListRoom from './ListRoom'

interface ReservationProps {
  initialData: RoomTypeModel[]
  userId: string
}

const Reservation: FC<ReservationProps> = ({ initialData, userId }) => {
  const [open, setOpen] = useState<boolean>(false)

  const firstLoad = useFirstLoad()
  const dateRange = useDateRange()
  const reservation = useReservation()
  const location = useLocation()

  const searchParams = useSearchParams().toString()

  /*
    I really don't know how to get around this shit(get url query, fetch data from
    db using that query and then render it). That causes infinite
  */
  useEffect(() => {
    if (!firstLoad.isFirstLoad) return

    const newData = queryConvert.queryToObj(searchParams)
    dateRange.setDate(newData.date)
    reservation.setRooms(newData.roomResInfos)
    firstLoad.setIsFirstLoad(false)
    location.setLocation(newData.location)
  }, [dateRange, reservation, firstLoad, location, searchParams])

  return (
    <div className='flex flex-col h-full'>
      <SearchInfo onOpen={() => setOpen((o) => !o)} />
      {open && <SearchBar onClose={() => setOpen(false)} />}
      <div className='h-full'>
        <ListRoom userId={userId} initialData={initialData} />
      </div>
    </div>
  )
}

export default Reservation
