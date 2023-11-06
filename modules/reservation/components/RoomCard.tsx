'use client'

import Image from 'next/image'
import { FC, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Check, PercentIcon } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { RoomType } from '@/shared/types/RoomType'
import { Discount } from '@/shared/types/Discount'
import RoomDetails from './RoomDetails'

interface RoomProps {
  roomType: RoomType & { discount?: Discount | null }
  isSelected: boolean
  handleSelectRoom: (roomTypeId: string) => void
}

const RoomCard: FC<RoomProps> = ({
  roomType,
  handleSelectRoom,
  isSelected,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* <AlertDialog open={open} onOpenChange={() => setOpen((o) => !o)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div>
              <Image
                src={roomType.roomImgs[0]}
                alt='sf'
                width={0}
                height={0}
                sizes='100vw'
                className='w-full h-56'
              />

              <div className='p-2 flex flex-col flex-1 justify-between'>
                <h2 className='font-medium text-xl'>{roomType.name}</h2>
                <div className='block'></div>
                <div
                  onClick={() => handleSelectRoom(roomType.id)}
                  className={cn(buttonVariants(), 'flex justify-between py-5')}
                >
                  <h2 className='font-bold block text-xs xl:text-xl'>
                    {isSelected ? 'Keep Room' : 'Select Room '}
                  </h2>
                  <div>
                    <h2 className='font-bold block  text-sm xl:text-xl mr-2'>
                      {roomType.discount
                        ? `$ ${roomType.price} -> $ ${
                            (roomType.price *
                              (100 - roomType.discount.discountPercent)) /
                            100
                          }`
                        : `$ ${roomType.price}`}
                    </h2>
                    {roomType.discount ? (
                      <div className='text-xs flex'>
                        {roomType.discount.name}{' '}
                        {roomType.discount.discountPercent}
                        <PercentIcon className='w-3 h-3' />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => setOpen(false)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}

      <div
        className={cn(
          'relative border border-zinc-300 rounded-md overflow-hidden h-[350px] flex flex-col justify-between',
          isSelected ? 'border-4 border-teal-600' : ''
        )}
      >
        <div
          className={cn(
            '',
            isSelected
              ? 'absolute top-0 left-0 bg-primary text-white rounded-br-md'
              : 'hidden'
          )}
        >
          <Check className='w-6 h-6' />
        </div>
        <Image
          src={roomType.roomImgs[0]}
          alt='sf'
          width={0}
          height={0}
          sizes='100vw'
          className='w-full h-56'
        />
        <div className='p-2 flex flex-col flex-1 justify-between'>
          <h2 className='font-medium text-xl'>{roomType.name}</h2>
          <div className='block'>
            <RoomDetails roomType={roomType}>
              <Button
                variant='link'
                size='sm'
                onClick={() => {
                  setOpen(true)
                }}
              >
                Room details &#62;
              </Button>
            </RoomDetails>
          </div>
          <div
            onClick={() => handleSelectRoom(roomType.id)}
            className={cn(buttonVariants(), 'flex justify-between py-5')}
          >
            <h2 className='font-bold block text-xs xl:text-xl'>
              {isSelected ? 'Keep Room' : 'Select Room '}
            </h2>
            <div>
              <h2 className='font-bold block  text-sm xl:text-xl mr-2'>
                {roomType.discount
                  ? `$ ${roomType.price} -> $ ${
                      (roomType.price *
                        (100 - roomType.discount.discountPercent)) /
                      100
                    }`
                  : `$ ${roomType.price}`}
              </h2>
              {roomType.discount ? (
                <div className='text-xs flex'>
                  {roomType.discount.name} {roomType.discount.discountPercent}
                  <PercentIcon className='w-3 h-3' />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RoomCard
