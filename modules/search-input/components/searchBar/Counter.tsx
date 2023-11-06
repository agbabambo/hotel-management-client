'use client'

import { Icons } from '@/components/Icons'

interface CounterProps {
  title?: string
  value: number
  min: number
  max: number
  label: string
  onChange: (label: string, action: 'add' | 'reduce') => void
}

const Counter: React.FC<CounterProps> = ({
  onChange,
  min,
  max,
  title,
  value,
  label,
}) => {
  // FIXLATER: why use callback
  const onAdd = () => {
    if (value === max) return
    onChange(label, 'add')
  }

  const onReduce = () => {
    if (value === min) return
    onChange(label, 'reduce')
  }

  return (
    <div className='flex flex-col'>
      {title && <div className='font-semibold text-md'>{title}</div>}
      <div className='flex items-center gap-3 relative'>
        <button
          className={`${value > min ? 'cursor-pointer' : 'cursor-not-allowed'}`}
          onClick={onReduce}
        >
          <Icons.minus width={20} fill={value > min ? '#020617' : '#94a3b8'} />
        </button>
        <div>{value}</div>
        <button
          className={`${
            value !== max ? 'cursor-pointer' : 'cursor-not-allowed'
          } text-neutral-500`}
          onClick={onAdd}
        >
          <Icons.plus width={20} fill={value !== max ? '#020617' : '#94a3b8'} />
        </button>
        {/* TODO: */}
        {/* <div className="absolute text-xs top-0">
          You've reached the maximum number of guests for a single room. Please
          add another room.
        </div> */}
      </div>
    </div>
  )
}

export default Counter
