'use client'

import { FC, useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import ReservationSummary from './ReservationSummary'
import RoomCard from './RoomCard'
import { cn } from '@/lib/utils'
import Payment from './Payment'
import { useDateRange } from '@/modules/search-input/context/dateRange'
import { useReservation } from '@/modules/search-input/context/reservation'
import { checkDateRangeCollision } from '@/modules/search-input/utils/checkDateRangeCollision'
import { renderPluralNumber } from '@/modules/search-input/utils/renderPluralNumber'
import { RoomType } from '@/shared/types/RoomType'
import { Room } from '@/shared/types/Room'
import { Booking_Room } from '@/shared/types/Booking_Room'
import { Discount } from '@/shared/types/Discount'
import { Booking } from '@/shared/types/Booking'
import { RoomTypeModel } from '../models/RoomTypeModel'

interface ListRoomProps {
  initialData: RoomTypeModel[]
  userId: string
}

const mockAmenities = [
  'Free WiFi',
  'Non-smoking rooms',
  'On-site restaurant',
  'Outdoor pool',
  'Fitness center',
  'Pet-friendly rooms',
]

const ListRoom: FC<ListRoomProps> = ({ initialData, userId }) => {
  const dateRange = useDateRange()
  const reservation = useReservation()

  const [slide, setSlide] = useState<number>(1)
  const [isPayment, setIsPaymet] = useState(false)

  const filteredRoomByDate = initialData.filter((rt) =>
    rt.rooms.some((room) =>
      room.booking_rooms.every(
        ({ booking }) =>
          !checkDateRangeCollision(
            { from: booking.startDate, to: booking.endDate },
            { from: dateRange.date.from, to: dateRange.date.to }
          )
      )
    )
  )

  useEffect(() => {
    const res =
      reservation.rooms.reduce((a, c) => (!c.roomTypeId ? a : a + 1), 0) ===
      reservation.rooms.length
    setIsPaymet(res)
  }, [reservation.rooms])

  const onNext = () => {
    if (slide === reservation.rooms.length) return
    setSlide((p) => p + 1)
  }

  const onPrev = () => {
    if (slide === 1) return
    setSlide((p) => p - 1)
  }

  const onSelectSlide = (num: number) => {
    if (slide === num) return
    setSlide(num)
  }

  const handleSelectRoom = (resInfoId: string) => {
    return (roomTypeId: string) => {
      const newRoomInfos = [...reservation.rooms]
      for (let i = 0; i < newRoomInfos.length; i++) {
        if (newRoomInfos[i].id === resInfoId) {
          newRoomInfos[i].roomTypeId = roomTypeId
        }
      }
      reservation.setRooms(newRoomInfos)
      onNext()
    }
  }

  const renderRoom = () => {
    const filteredRoomByDate = initialData.filter((rt) =>
      rt.rooms.some((room) =>
        room.booking_rooms.every(
          ({ booking }) =>
            !checkDateRangeCollision(
              { from: booking.startDate, to: booking.endDate },
              { from: dateRange.date.from!, to: dateRange.date.to! }
            )
        )
      )
    )

    const filteredData = filteredRoomByDate

    return filteredData.length > 0 ? (
      filteredRoomByDate.map((roomType, i) => (
        <div key={i} className=''>
          <RoomCard
            isSelected={
              reservation.rooms[slide - 1].roomTypeId === roomType.id
                ? true
                : false
            }
            handleSelectRoom={handleSelectRoom(reservation.rooms[slide - 1].id)}
            roomType={roomType}
          />
        </div>
      ))
    ) : (
      <h1>No room left, please choose another day.</h1>
    )
  }

  const renderSlide = () => {
    switch (slide) {
      case 1:
        return renderRoom()
      default:
        return renderRoom()
    }
  }

  return (
    <div className='container p-10 h-full max-w-7x'>
      <div className='flex gap-10'>
        <div className='flex-1'>
          <div className='mr-5 flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
              <p className='text-zinc-500'>
                {reservation.rooms.length > 1 ? (
                  <span>
                    Room {slide} of {reservation.rooms.length}
                  </span>
                ) : null}
              </p>
              <h1 className='font-extrabold text-4xl'>Select a Room</h1>
              <Progress
                className='h-1'
                value={(slide / (reservation.rooms.length + 1)) * 100}
              />
              <ul className='mt-3'>
                {reservation.rooms.map((_, i) => (
                  <Button
                    disabled={isPayment}
                    key={i}
                    className={cn('mr-4 cursor-pointer')}
                    onClick={() => onSelectSlide(i + 1)}
                  >
                    Room {i + 1}
                  </Button>
                ))}
                <Button disabled={!isPayment}>Payment</Button>
              </ul>

              <div className='mt-2'>
                <h2 className='font-bold'>
                  Your stay with Hilton Garden Inn includes
                </h2>
                <ul className='flex gap-x-4 flex-wrap overflow-hidden'>
                  {mockAmenities.map((a, i) => (
                    <li className='text-sm text-zinc-600' key={i}>
                      &#x2713; {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {isPayment ? (
              <Payment roomTypes={filteredRoomByDate} userId={userId} />
            ) : (
              <div className='flex flex-col gap-3'>
                <p className='text-sm'>
                  {/* TODO: */}
                  {renderPluralNumber(filteredRoomByDate.length, 'room')} found.
                  We&apos;re showing the average price per night.
                </p>
                <hr />

                <div className='grid grid-cols-2 gap-3'>{renderSlide()}</div>
              </div>
            )}
          </div>
        </div>
        <div className='w-[30%] block'>
          <ReservationSummary slide={slide} roomTypes={filteredRoomByDate} />
        </div>
      </div>
    </div>
  )
}

export default ListRoom
