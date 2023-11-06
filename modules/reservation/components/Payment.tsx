'use client'

import { toast } from '@/components/ui/use-toast'
import { useDateRange } from '@/modules/search-input/context/dateRange'
import { useReservation } from '@/modules/search-input/context/reservation'
import { RoomType } from '@/shared/types/RoomType'
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveData,
  OnApproveActions,
} from '@paypal/paypal-js'
import { PayPalButtons } from '@paypal/react-paypal-js'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

interface PaymentProps {
  roomTypes: RoomType[]
  userId: string
}

const Payment: FC<PaymentProps> = ({ roomTypes, userId }) => {
  const reservation = useReservation()
  const dateRange = useDateRange()
  const router = useRouter()

  const calTotalMoney = () => {
    let total = 0
    reservation.rooms.forEach((r) => {
      roomTypes.forEach((rt) => {
        if (rt.id === r.roomTypeId) total += rt.price
      })
    })
    return total
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ) => {
    try {
      const res = await axios.post('/api/payment/create-paypal', {
        cost: calTotalMoney(),
      })
      return res.data.id
    } catch (err) {
      console.log('[PAYMENT_CREATE_ORDER]', err)
    }
  }

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    try {
      console.log('onApprove_reservation', reservation.rooms)
      console.log('onApprove_dateRange', dateRange.date)
      console.log('onApprove', data)

      const res = await axios.post('/api/payment/capture-paypal', {
        orderId: data.orderID,
        roomCharge: calTotalMoney(),
        userId,
        dateRange: dateRange.date,
        reservation: reservation.rooms,
      })

      console.log('onApprove_res', res)

      toast({ title: 'Completed payment' })
      router.push(`/${userId}/booking`)
      router.refresh()
    } catch (err) {
      console.log('[PAYMENT_ON_APPROVE]', err)
    }
  }

  return (
    <div>
      <h1 className='text-3xl font-bold mb-10'>Pay by Paypal</h1>

      <div className='w-[400px]'>
        <PayPalButtons
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
        />
      </div>
    </div>
  )
}

export default Payment
