'use client'

import { ColumnDef } from '@tanstack/react-table'

import { CellAction } from './cell-action'

export type Column = {
  id: string
  startDate: string
  endDate: string
  roomName: string
  price: number
  createdAt: string
}

export const columns: ColumnDef<Column>[] = [
  {
    accessorKey: 'roomName',
    header: 'Room Name',
    cell: ({ row }) => <div className='font-bold'>{row.original.roomName}</div>,
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => <div className='text-bold'>$ {row.original.price}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
