'use client'

import { FC, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'

import * as queryConvert from '@/lib/query'
import SearchInfo from '@/modules/search-input/components/SearchInfo'
import SearchBar from '@/modules/search-input/components/searchBar'
import { useLocation } from '@/modules/search-input/context/location'
import { useDateRange } from '@/modules/search-input/context/dateRange'
import { useReservation } from '@/modules/search-input/context/reservation'
import { RoomTypeModel } from '@/modules/reservation/models/RoomTypeModel'
import { useFirstLoad } from '@/store/firstLoad'
import ListRoom from './ListRoom'
import { RoomType } from '@/shared/types/RoomType'
import { getRoomTypes } from '../services/ReservationService'
import { getHotel, getHotels } from '@/modules/search/services/HotelService'
import { HotelVm } from '@/modules/search/models/HotelModel'

interface ReservationProps {
  userId: string
}

const Reservation: FC<ReservationProps> = ({ userId }) => {
  const searchParams = useSearchParams()

  const [open, setOpen] = useState<boolean>(false)

  // change to Vm
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([])
  const [hotel, setHotel] = useState<HotelVm>()

  const firstLoad = useFirstLoad()
  const dateRange = useDateRange()
  const reservation = useReservation()
  const location = useLocation()

  useEffect(() => {
    if (!firstLoad.isFirstLoad) return

    const newData = queryConvert.queryToObj(searchParams.toString())
    dateRange.setDate(newData.date)
    reservation.setRooms(newData.roomResInfos)
    firstLoad.setIsFirstLoad(false)
    location.setLocation(newData.location)

    getHotel(newData.hotel!).then((data) => {
      setHotel(data)
    })

    getRoomTypes(newData.hotel!).then((data) => {
      setRoomTypes(data)
    })
  }, [dateRange, reservation, firstLoad, location, searchParams])

  // useEffect(() => {
  //   const hotelId = searchParams.get('hotel')
  //   if (!hotelId) return
  //   getRoomTypes(hotelId).then((data) => {
  //     setRoomTypes(data)
  //   })
  // // TODO:
  //   // getHotels(location.location.code).then()
  // }, [searchParams])

  return (
    <div className='flex flex-col h-full'>
      <SearchInfo onOpen={() => setOpen((o) => !o)} />
      {open && <SearchBar onClose={() => setOpen(false)} />}
      <div className='h-full'>
        <ListRoom userId={userId} roomTypes={roomTypes} hotel={hotel} />
      </div>
    </div>
  )
}

export default Reservation
