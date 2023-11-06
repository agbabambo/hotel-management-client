'use client'

import { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import * as queryConvert from '@/lib/query'
import { useDateRange } from '@/modules/search-input/context/dateRange'
import { useLocation } from '@/modules/search-input/context/location'
import { useReservation } from '@/modules/search-input/context/reservation'
import SearchInfo from '@/modules/search-input/components/SearchInfo'
import SearchBar from '@/modules/search-input/components/searchBar'
import { useFirstLoad } from '@/store/firstLoad'
import SearchResult from '@/modules/search/components/SearchResult'
import Map from '@/modules/search/components/Map'
import { getHotels } from '@/modules/search/services/HotelService'
import { Hotel } from '@/modules/search/models/HotelModel'

interface SearchPageProps {}

const SearchPage: FC<SearchPageProps> = () => {
  const [open, setOpen] = useState<boolean>(false)

  const [hotels, setHotels] = useState<Hotel[]>([])

  const firstLoad = useFirstLoad()
  const dateRange = useDateRange()
  const reservation = useReservation()
  const location = useLocation()

  const searchParams = useSearchParams().toString()

  useEffect(() => {
    if (!firstLoad.isFirstLoad) return

    const newData = queryConvert.queryToObj(searchParams)
    firstLoad.setIsFirstLoad(false)
    dateRange.setDate(newData.date)
    reservation.setRooms(newData.roomResInfos)
    location.setLocation(newData.location)
  }, [firstLoad, dateRange, reservation, location, searchParams])

  useEffect(() => {
    getHotels(location.location.name).then((res) => {
      console.log('hotels', res)
      setHotels(res)
    })
  }, [])

  return (
    <div className='flex flex-col h-full'>
      <SearchInfo onOpen={() => setOpen((o) => !o)} />
      {open && <SearchBar onClose={() => setOpen(false)} />}

      <hr className='h-1 bg-neutral-400 border-neutral-300 my-4 mx-6' />

      <div className='flex mx-6'>
        <SearchResult hotels={hotels} />
        <Map hotels={hotels} />
      </div>
    </div>
  )
}

export default SearchPage
