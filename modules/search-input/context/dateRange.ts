import { DateRange } from 'react-day-picker'
import { create } from 'zustand'

interface IDateRange {
  date: DateRange
  setDate: (dr: DateRange) => void
}

export const useDateRange = create<IDateRange>((set) => ({
  date: { from: new Date(), to: new Date() },
  setDate: (dr: DateRange) => set(() => ({ date: dr })),
}))
