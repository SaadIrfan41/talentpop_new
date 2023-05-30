import FirstTimeCheckout from '@/components/CheckoutSessionButton/FirstTimeCheckout'
import RecurringCheckout from '@/components/CheckoutSessionButton/RecurringCheckout'
import { getInvoice } from '@/components/InvoiceData'
import React from 'react'
import { redirect } from 'next/navigation'

// const getInvoice = async ({ id }: { id: string }) => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/invoice?id=${id}`
//     )
//     //   console.log(await res.json())
//     return res.json()
//   } catch (error) {
//     console.log('Checkout error', error)
//   }
// }
// await fetch(`http://localhost:3000/api/revalidate?tag=invoice`)

export type FirstTimeInvoiceTypes = {
  id: string

  num_of_agents: Number
  agent_working_days: Number
  agent_working_hours: Number
  setup_fee: Number
  is_payed: Boolean
}
export type MonthlyInvoiceTypes = {
  id: string

  num_of_agents: Number
  agent_working_days: Number
  agent_working_hours: Number
  is_payed: Boolean
  payment_recurring_date: Date | null
}
export type InvoiceTypes = {
  FirstTimeInvoice: FirstTimeInvoiceTypes
  MonthlyInvoice: MonthlyInvoiceTypes
}

const InvoicePage = async () => {
  //   const session = await getServerSession(authOptions)
  const today = Date.now()
  const data: InvoiceTypes = await getInvoice()
  if (data.MonthlyInvoice.payment_recurring_date) {
    if (new Date(data.MonthlyInvoice.payment_recurring_date) > new Date(today))
      redirect('/recruitmentstatus')
  }
  // console.log(data)
  return (
    <div className=''>
      {data !== null ? (
        data.FirstTimeInvoice.is_payed ? (
          <RecurringCheckout body={data.MonthlyInvoice} />
        ) : (
          <FirstTimeCheckout body={data.FirstTimeInvoice} />
        )
      ) : (
        'No Invoice Found'
      )}
    </div>
  )
}

export default InvoicePage
