'use client'

import { FC } from 'react'

import { Hotel } from '../models/HotelModel'
import MapMarkerHotel from '@/components/map/MapMarkerHotels'

interface MapProps {
  hotels?: Hotel[]
}

const Map: FC<MapProps> = ({ hotels }) => {
  return (
    <div className='flex-1 h-[90vh] sticky top-14'>
      <MapMarkerHotel zoom={13} hotels={hotels} />
    </div>
  )
}

export default Map
