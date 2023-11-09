'use client'

import { useRouter } from 'next/navigation'
import { XCircleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useDateRange } from '@/modules/search-input/context/dateRange'
import { useReservation } from '@/modules/search-input/context/reservation'
import { useLocation } from '@/modules/search-input/context/location'
import { objToQuery } from '@/lib/query'
import LocationBox from './LocationBox'
import DateBox from './DateBox'
import RoomGuestBox from './RoomGuestBox'
import { useState } from 'react'

interface SearchBarProps {
  onClose?: () => void
  variant: 'MAIN' | 'SEARCHED'
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose, variant }) => {
  const router = useRouter()

  const reservationInfo = useReservation()
  const dateRange = useDateRange()
  const location = useLocation()

  // TODO: yeah
  const [isTyping, setIsTyping] = useState<boolean>(false)

  const [warn, setWarn] = useState<boolean>(location.location.name === '')

  const onSearch = () => {
    if (location.location.name === '' || location.location.code === -1) {
      // setWarn(true)
      return
    }

    const url = objToQuery({
      baseUrl: '/search',
      date: dateRange.date,
      roomResInfo: reservationInfo.rooms,
      location: location.location,
    })
    router.push(url)
  }

  return (
    <div
      className='flex items-center justify-center gap-3 bg-neutral-100
    py-1 border-b-[1px]'
    >
      <div className='font-bold text-xl'>
        {variant === 'MAIN' ? (
          <div>
            <div>Where to</div>
            <div className='text-zinc-800 text-xs font-light'>(Required)</div>
          </div>
        ) : (
          'Edit Stay'
        )}
      </div>

      <LocationBox setIsTyping={setIsTyping} />
      <DateBox />
      <RoomGuestBox />

      <Button variant='teal' onClick={() => onSearch()}>
        Find room
      </Button>

      {warn && (
        <div className='text-red-500 text-xs'>Please enter a Location</div>
      )}

      {variant === 'SEARCHED' && onClose && (
        <button onClick={() => onClose()}>
          <XCircleIcon className='w-8 h-8 text-teal-600' />
        </button>
      )}
    </div>
  )
}

export default SearchBar
