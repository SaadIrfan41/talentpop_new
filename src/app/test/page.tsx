import React from 'react'
import { InvoiceTypes } from '../invoice/page'
import { getInvoice } from '@/components/InvoiceData'
import { redirect } from 'next/navigation'
const page = async () => {
  const data: InvoiceTypes = await getInvoice()
  console.log(data)
  const date = Date.now()
  if (data.MonthlyInvoice.payment_recurring_date) {
    if (new Date(data.MonthlyInvoice.payment_recurring_date) > new Date(date))
      redirect('/invoice')
  }
  return <div>page</div>
}

export default page
