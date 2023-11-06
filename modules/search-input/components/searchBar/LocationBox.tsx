'use client'

import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useDebounce } from '@/hooks/useDebounce'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { useLocation } from '@/modules/search-input/context/location'
import { RotateCw } from 'lucide-react'

const PROVINCE_API_URL = 'https://provinces.open-api.vn/api/p/search/?q='

interface LocationBoxProps {}

type Province = {
  name: string
  code: number
}

const LocationBox: React.FC<LocationBoxProps> = () => {
  // am i a stupid?
  const { location, setLocation } = useLocation()
  const debouncedInput = useDebounce<string>(location.name, 500)
  const [open, setOpen] = useState<boolean>(false)
  // fix Input lost focus when Popover popup
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [fetchedData, setFetchedData] = useState<Province[]>([])
  const [selectedProvince, setSelectedProvince] = useState<Province>({
    name: '',
    code: -1,
  })
  const inputRef = useRef<HTMLInputElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = () => {
    setOpen(false)
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const onSelect = (province: Province) => {
    setLocation(province)
    setSelectedProvince(province)
    setOpen(false)
  }

  useOnClickOutside(popoverRef, handleClickOutside)

  useEffect(() => {
    const getData = async () => {
      const data = (await axios.get(PROVINCE_API_URL + debouncedInput)).data
      setFetchedData(data)
      setOpen(true)
      setTimeout(() => {
        inputRef.current?.focus()
      }, 10)
    }

    if (isFocused && location.name.length !== 0) {
      getData()
    }
  }, [isFocused, debouncedInput, inputRef, location])

  return (
    <Popover open={open}>
      <PopoverTrigger>
        <Input
          placeholder='Search for a location'
          ref={inputRef}
          value={location.name}
          onChange={(e) => setLocation({ name: e.target.value, code: -1 })}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </PopoverTrigger>
      <PopoverContent>
        <div ref={popoverRef}>
          {fetchedData.length !== 0 ? (
            fetchedData.map((province) => (
              <Button
                key={province.code}
                className='w-full justify-start'
                variant='ghost'
                onClick={() => onSelect(province)}
              >
                {province.name}
              </Button>
            ))
          ) : (
            <div className='text-xs mx-auto'>No results found</div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default LocationBox
