'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { FirstTimeInvoiceTypes } from '@/app/invoice/page'

const FirstTimeCheckout = ({ body }: { body: FirstTimeInvoiceTypes }) => {
  const router = useRouter()
  const createCheckoutSession = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/create-checkout-session`,
        {
          method: 'POST',
          body: JSON.stringify({ body }),
        }
      )
      //   console.log(await res.json())
      const { url } = await res.json()

      router.push(url)
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
          <span>{body.num_of_agents.toString()} Agents</span>
        </span>
        <span>
          Setup Fees (One Time)_ _ _ _ _ _ _ _ $
          <span>{body.setup_fee.toString()}</span>
        </span>
        <span>
          Agents Working Hours_ _ _ _ _ _ _ _
          <span>{body.agent_working_hours.toString()} Hours</span>
        </span>
        <span>
          Agents Working Days _ _ _ _ _ _ _ _
          <span>{body.agent_working_days.toString()} Days</span>
        </span>
        {/* <span>
          Next Payment Date _ _ _ _ _ _ _ _
          <span>{body.agent_working_days}</span>
        </span> */}
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

export default FirstTimeCheckout
