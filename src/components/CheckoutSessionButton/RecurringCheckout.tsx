'use client'
import { MonthlyInvoiceTypes } from '@/app/invoice/page'
import React from 'react'

const RecurringCheckout = ({ body }: { body: MonthlyInvoiceTypes }) => {
  const createCheckoutSession = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/create-checkout-session`,
        {
          method: 'POST',
          body: JSON.stringify({ body: 'HELLO WORLD' }),
        }
      )
      console.log(await res.json())
    } catch (error) {
      console.log('Checkout error', error)
    }
  }
  return (
    <div className='mx-auto mt-20 flex max-w-7xl flex-col items-center justify-center text-2xl font-medium'>
      <h2 className=' font-semibold'>
        Order No: <span className='font-medium'># {body.id}</span>
      </h2>
      <div className='mt-5 flex flex-col  gap-y-7'>
        <span>
          No. Of Agents _ _ _ _ _ _ _ _
          <span>{body.num_of_agents.toString()}</span>
        </span>
        {/* <span>
          Setup Fees (One Time)_ _ _ _ _ _ _ _
          <span>{body.setup_fee.toString()}</span>
        </span> */}
        <span>
          Agents Working Hours_ _ _ _ _ _ _ _
          <span>{body.agent_working_hours.toString()}</span>
        </span>
        <span>
          Agents Working Days _ _ _ _ _ _ _ _
          <span>{body.agent_working_days.toString()}</span>
        </span>
        <span>
          Next Payment Date _ _ _ _ _ _ _ _
          <span>{body.payment_recurring_date?.toDateString()}</span>
        </span>
      </div>
      <button
        onClick={() => createCheckoutSession()}
        className='mt-5 rounded-xl bg-[#D0F289] px-[42px] py-[10px] text-[#808080]'
      >
        Pay Now
      </button>
    </div>
  )
}

export default RecurringCheckout
