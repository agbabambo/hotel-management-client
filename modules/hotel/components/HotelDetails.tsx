'use client'

import { FC, useEffect, useState } from 'react'
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
import { getDistrict, getProvince, getWard } from '../services/AddressService'
import ImageCarousel from '@/components/ui/image-carousel'

interface HotelDetailsProps {
  children: React.ReactNode
  hotel: Hotel
}

const GOOGLE_SEACH_URL = 'https://www.google.com/maps/place/'

const HotelDetails: FC<HotelDetailsProps> = ({ children, hotel }) => {
  const [ward, setWard] = useState<string>('')
  const [district, setDistrict] = useState<string>('')
  const [province, setProvince] = useState<string>('')

  useEffect(() => {
    if (hotel.address) {
      getProvince(hotel.address?.province).then((data) =>
        setProvince(data.name)
      )
      getDistrict(hotel.address.district).then((data) => setDistrict(data.name))
      getWard(hotel.address.ward).then((data) => setWard(data.name))
    }
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='w-2/3'>
        <AlertDialogHeader>
          <DialogTitle>{hotel.name}</DialogTitle>
          <DialogDescription className='text-xs'>
            {hotel.address?.addressLine} {ward && `, ${ward}, `}{' '}
            {district && `${district}, `}
            {province}
          </DialogDescription>
        </AlertDialogHeader>
        <ImageCarousel images={hotel.images} />

        <div className='grid grid-cols-5  items-center'>
          <div className='col-span-2 flex justify-center items-center flex-col gap-3'>
            {/* TODO: smallest price */}
            <div className='text-3xl font-bold'>$207</div>
            <Button size='sm' className='px-8 text-xs'>
              View Rates
            </Button>
          </div>
          <Link
            target='_blank'
            href={
              GOOGLE_SEACH_URL +
              `${hotel.address?.addressLine},+${ward},+${district},+${province}`
            }
          >
            <div className='col-span-1 flex flex-col gap-3 justify-center items-center border-r-[1px]'>
              <MapPinIcon className='w-6 h-6 text-teal-600' />
              <div className='text-xs2 text-teal-600'>
                Direction <CopyIcon className='w-2 h-2 inline-block' />
              </div>
            </div>
          </Link>

          <Link
            target='_blank'
            href={
              GOOGLE_SEACH_URL +
              `${hotel.address?.addressLine},+${ward},+${district},+${province}`
            }
          >
            <div className='col-span-1 flex flex-col gap-3 justify-center items-center border-r-[1px]'>
              <Globe2Icon className='w-6 h-6 text-teal-600' />
              <div className='text-xs2 text-teal-600'>
                Visit Website <CopyIcon className='w-2 h-2 inline-block' />
              </div>
            </div>
          </Link>

          <Link target='_blank' href={''}>
            <div className='col-span-1 flex flex-col gap-3 justify-center items-center'>
              <PhoneIcon className='w-6 h-6 text-teal-600' />
              <div className='text-xs2 text-teal-600'>
                + {hotel.address?.phone}
              </div>
            </div>
          </Link>
        </div>

        <div className='flex flex-col justify-center items-center text-xs font-semibold'>
          <div>Rating: 4.5 out of 5.0</div>
          {/* TODO: change star icon */}
          <Rating numberOfStars={5} starDimension='22px' starSpacing='0px' />
          <Button variant='link' size='sm' className='text-teal-600 text-xs'>
            Read the last 5 reviews
            <ChevronDownIcon className='w-4 h-4' />
          </Button>
        </div>

        <hr />

        <div>
          <div className='text-xs text-zinc-500 font-semibold mb-3'>
            Description
          </div>
          <div className='ml-4 text-xs'>{hotel.description}</div>
        </div>

        <hr />

        <div>
          <div className='text-xs text-zinc-500 font-semibold mb-3'>
            Amenities
          </div>
          <div className='ml-4 text-xs grid grid-cols-4'>
            <div className='flex flex-col gap-2 justify-center items-center'>
              <WifiIcon className='w-16 h-16 text-zinc-500' />
              <div className='text-xs2 text-zinc-500'>Free Wifi</div>
            </div>
            <div className='flex flex-col gap-2 justify-center items-center'>
              <GlobeIcon className='w-16 h-16 text-zinc-500' />
              <div className='text-xs2 text-zinc-500'>Nothing</div>
            </div>
            <div className='flex flex-col gap-2 justify-center items-center'>
              <KeyIcon className='w-16 h-16 text-zinc-500' />
              <div className='text-xs2 text-zinc-500'>Digital Keys</div>
            </div>
            <div className='flex flex-col gap-2 justify-center items-center'>
              <WeightIcon className='w-16 h-16 text-zinc-500' />
              <div className='text-xs2 text-zinc-500'>Fitness center</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default HotelDetails
