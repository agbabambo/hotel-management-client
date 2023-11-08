'use client'

import { FC, useEffect, useState } from 'react'

import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import ReservationSummary from './ReservationSummary'
import RoomCard from './RoomCard'
import { cn } from '@/lib/utils'
import Payment from './Payment'
import { useReservation } from '@/modules/search-input/context/reservation'
import { renderPluralNumber } from '@/modules/search-input/utils/renderPluralNumber'
import { HotelVm } from '@/modules/search/models/HotelModel'
import { RoomTypeVm } from '../models/RoomTypeVm'
import HotelInfo from './HotelInfo'

interface ListRoomProps {
  roomTypes: RoomTypeVm[]
  hotel: HotelVm
  userId: string
}

const ListRoom: FC<ListRoomProps> = ({ roomTypes, hotel, userId }) => {
  const totalSlide = roomTypes.length + 1 // +1 payment slide

  const reservation = useReservation()

  // remember slide start with 1 not 0
  const [slide, setSlide] = useState<number>(1)
  const [currentSlide, setCurrentSlide] = useState<number>(1)

  const [isPayable, setIsPayable] = useState(false)

  // useEffect(() => {
  //   const res =
  //     reservation.rooms.reduce((a, c) => (!c.roomTypeId ? a : a + 1), 0) ===
  //     reservation.rooms.length
  //   setIsPayable(res)
  // }, [reservation.rooms])

  // disable move next slide when current slide is reselect
  const onNext = () => {
    if (slide === totalSlide) return
    if (slide + 1 === totalSlide) setIsPayable(true)
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
    return roomTypes.length > 0 ? (
      roomTypes.map((roomType, i) => (
        <div key={i} className=''>
          <RoomCard
            isSelected={
              reservation.rooms[slide].roomTypeId === roomType.id ? true : false
            }
            handleSelectRoom={handleSelectRoom(reservation.rooms[slide].id)}
            roomType={roomType}
            hotel={hotel}
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
                value={(slide / reservation.rooms.length) * 100}
              />
              <ul className='mt-3'>
                {reservation.rooms.map((_, i) => (
                  <Button
                    disabled={isPayable}
                    key={i}
                    className={cn(
                      'mr-4 rounded-full bg-teal-600 hover:bg-teal-600/80'
                    )}
                    onClick={() => onSelectSlide(i + 1)}
                  >
                    Room {i + 1}
                  </Button>
                ))}
                <Button
                  variant='teal'
                  className='rounded-full outline-none'
                  disabled={!isPayable}
                >
                  Payment
                </Button>
              </ul>

              <div className='mt-2'>
                {hotel && (
                  <h2 className='font-bold'>
                    Your stay with {hotel.name} includes
                  </h2>
                )}
                <ul className='flex gap-x-4 flex-wrap overflow-hidden'>
                  {hotel &&
                    hotel.amenity_Hotels.map((ah, i) => (
                      <li className='text-sm text-zinc-600' key={i}>
                        &#x2713; {ah.amenity.name}
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            {isPayable ? (
              <Payment roomTypes={roomTypes} userId={userId} />
            ) : (
              <div className='flex flex-col gap-3'>
                <p className='text-sm'>
                  {/* TODO: */}
                  {renderPluralNumber(roomTypes.length, 'room')} found.
                  We&apos;re showing the average price per night.
                </p>
                <hr />

                <div className='grid grid-cols-2 gap-3'>{renderSlide()}</div>
              </div>
            )}
          </div>
        </div>
        <div className='w-[30%] block'>
          <HotelInfo hotel={hotel} />
          <ReservationSummary slide={slide} roomTypes={roomTypes} />
        </div>
      </div>
    </div>
  )
}

export default ListRoom
