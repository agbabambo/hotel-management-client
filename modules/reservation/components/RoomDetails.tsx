'use client'

import React, { FC, useEffect, useState } from 'react'
import {
  ChevronDownIcon,
  CopyIcon,
  Globe2Icon,
  GlobeIcon,
  KeyIcon,
  MapPinIcon,
  PhoneIcon,
  WeightIcon,
  WifiIcon,
} from 'lucide-react'
import Rating from 'react-star-ratings'
import Link from 'next/link'

import { AlertDialogHeader } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Hotel } from '@/modules/search/models/HotelModel'
import ImageCarousel from '@/components/ui/image-carousel'
import { Room } from '@/shared/types/Room'
import { RoomType } from '@/shared/types/RoomType'

interface RoomDetailsProps {
  children: React.ReactNode
  roomType: RoomType
}

const RoomDetails: FC<RoomDetailsProps> = ({ children, roomType }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {/* TODO: fix minwidht on small vw */}
      <DialogContent className='min-w-[400px] md:min-w-[1000px] p-0 rounded-md overflow-hidden flex outline-none'>
        <div className='w-1/2'>
          <div>
            <ImageCarousel images={roomType.roomImgs} />
          </div>
          <div className='px-6 py-3 space-y-3 bg-neutral-50'>
            <div className='font-bold'>{roomType.name}</div>
            <hr />
            <div className='text-xs w-full'>{roomType.description}</div>
            <Button className='w-full'>Book from ${roomType.price}</Button>
          </div>
        </div>

        <div className='w-1/2 py-6 px-3 space-y-6'>
          <div>
            <div className='font-bold text-xs mb-1'>Hotel amenities</div>
            <hr />
            <div className='ml-4 text-xs grid grid-cols-4 mt-3'>
              <div className='flex flex-col gap-2 justify-center items-center'>
                <WifiIcon className='w-5 h-5 text-zinc-500' />
                <div className='text-xs2 text-zinc-500'>Free Wifi</div>
              </div>
              <div className='flex flex-col gap-2 justify-center items-center'>
                <GlobeIcon className='w-5 h-5 text-zinc-500' />
                <div className='text-xs2 text-zinc-500'>Nothing</div>
              </div>
              <div className='flex flex-col gap-2 justify-center items-center'>
                <KeyIcon className='w-5 h-5 text-zinc-500' />
                <div className='text-xs2 text-zinc-500'>Digital Keys</div>
              </div>
              <div className='flex flex-col gap-2 justify-center items-center'>
                <WeightIcon className='w-5 h-5 text-zinc-500' />
                <div className='text-xs2 text-zinc-500'>Fitness center</div>
              </div>
            </div>
          </div>

          <div>
            <div className='font-bold text-xs mb-1'>Room highlights</div>
            <hr className='h-[1px]' />
            <ul className='grid grid-cols-2 p-3 gap-y-2 list-disc px-8'>
              <li className='text-xs'>Sleeps 3</li>
              <li className='text-xs'>Full-size refrigerator</li>
              <li className='text-xs'>Hairdryer</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default RoomDetails
