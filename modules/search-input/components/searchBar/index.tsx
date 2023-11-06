'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/Icons'
import { useDateRange } from '@/modules/search-input/context/dateRange'
import { useReservation } from '@/modules/search-input/context/reservation'
import { useLocation } from '@/modules/search-input/context/location'
import { objToQuery } from '@/lib/query'
import LocationBox from './LocationBox'
import DateBox from './DateBox'
import RoomGuestBox from './RoomGuestBox'

interface SearchBarProps {
  onClose?: () => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const router = useRouter()

  const reservationInfo = useReservation()
  const dateRange = useDateRange()
  const location = useLocation()

  const onSearch = () => {
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
      <div className='font-bold'>Edit Stay</div>

      <LocationBox />
      <DateBox />
      <RoomGuestBox />

      <Button onClick={() => onSearch()}>Find room</Button>
      {onClose && (
        <button onClick={() => onClose()}>
          {/* <Icons.close2 width={32} height={32} fill='#008080' /> */}
          <Icons.close2 width={32} height={32} fill='#000' />
        </button>
      )}
    </div>
  )
}

export default SearchBar
