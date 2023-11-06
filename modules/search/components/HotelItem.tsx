'use client'

import { FC } from 'react'
import Image from 'next/image'
import Rating from 'react-star-ratings'

import { Hotel } from '../models/HotelModel'
import { Button } from '@/components/ui/button'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import HotelDetails from '@/modules/hotel/components/HotelDetails'
import { useRouter } from 'next/navigation'
import { useReservation } from '@/modules/search-input/context/reservation'
import { useDateRange } from '@/modules/search-input/context/dateRange'
import { objToQuery } from '@/lib/query'

interface HotelItemProps {
  hotel: Hotel
}

const HotelItem: FC<HotelItemProps> = ({ hotel }) => {
  const router = useRouter()

  const reservationInfo = useReservation()
  const dateRange = useDateRange()

  const handleClickVewRate = () => {
    const url = objToQuery({
      baseUrl: '/reservation',
      date: dateRange.date,
      roomResInfo: reservationInfo.rooms,
      hotel: hotel.id,
    })

    router.push(url)
  }

  return (
    <div className='flex gap-3 py-3'>
      <div className='xl:w-[200px] w-1/3 h-full'>
        <AspectRatio ratio={16 / 9}>
          <Image
            src={hotel.images[0]}
            alt='Hotel Image'
            className='w-full h-full object-cover'
            fill
          />
        </AspectRatio>
      </div>
      <div className='flex-1'>
        <div className='font-bold'>{hotel.name}</div>
        <HotelDetails hotel={hotel}>
          <Button
            variant='link'
            className='text-[0.6rem] text-teal-600'
            size='inline'
          >
            Hotel Details
            <span aria-hidden='true'>&nbsp;&gt;</span>
          </Button>
        </HotelDetails>

        <div className='flex justify-between'>
          <div>
            <div className='text-xs font-bold'>Rating 4.0 out of 5.0d</div>
            <Rating numberOfStars={5} starDimension='14px' starSpacing='0px' />
            <div className='text-xs text-neutral-500'>Based on 804 reviews</div>
          </div>

          <div className='flex flex-col justify-end'>
            {/* TODO: well */}
            <div className='font-bold text-lg text-right'>$165</div>
            <Button className='text-xs' size='sm' onClick={handleClickVewRate}>
              View Rates
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelItem
