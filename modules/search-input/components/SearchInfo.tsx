import { FC } from 'react'
import { differenceInCalendarDays, format } from 'date-fns'

import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { renderPluralNumber } from '@/modules/search-input/utils/renderPluralNumber'
import { useReservation } from '../context/reservation'
import { useDateRange } from '../context/dateRange'
import { useLocation } from '../context/location'

interface SearchInfoProps {
  onOpen: () => void
}

const SearchInfo: FC<SearchInfoProps> = ({ onOpen }) => {
  const reservation = useReservation()
  const dateRange = useDateRange()
  const location = useLocation()

  const adults = reservation.rooms.reduce((a, c) => a + c.adults, 0)
  const kids = reservation.rooms.reduce((a, c) => a + c.kids, 0)

  return (
    <div className='flex items-center justify-center gap-3 h-14 py-1 border-b-[1px] mt-14'>
      <div className='font-bold'>Your search</div>

      <div className='flex gap-2 items-center text-sm border-neutral-300 border-r-[1px] pr-3 h-full'>
        <Icons.city width={24} height={24} />
        <div>{location.location.name}</div>
      </div>

      <div
        className='flex gap-2 items-center text-sm
    border-neutral-300 border-r-[1px] pr-3 h-full'
      >
        <Icons.calendar width={24} height={24} />
        <div>
          {format(
            dateRange.date?.from ? dateRange.date.from : new Date(),
            'LLL, E dd'
          )}
          <span className='px-2'>-</span>
          {format(
            dateRange.date?.to ? dateRange.date.to : new Date(),
            'LLL, E dd, yyyy'
          )}
          <span className='text-neutral-500 text-xs pl-1'>
            (
            {renderPluralNumber(
              // @ts-ignore
              differenceInCalendarDays(
                dateRange.date?.to ? dateRange.date.to : new Date(),
                dateRange.date?.from ? dateRange.date.from : new Date()
              ),
              'night'
            )}
            )
          </span>
        </div>
      </div>

      {/* RoomGuestInfo */}
      <div className='flex items-center gap-2 border-neutral-300 border-r-[1px] pr-3 h-full text-sm'>
        <Icons.people width={24} height={24} />
        {renderPluralNumber(reservation.rooms.length, 'room')} for{' '}
        {renderPluralNumber(adults, 'adult')} and{' '}
        {renderPluralNumber(kids, 'kid')}
      </div>

      <Button className='underline' variant='link' onClick={onOpen}>
        Edit search
      </Button>
    </div>
  )
}

export default SearchInfo
