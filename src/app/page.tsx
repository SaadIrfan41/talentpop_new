import { titleFont } from '@/utils/fonts'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from './api/auth/[...nextauth]/route'

const HomePage = async () => {
  const session = await getServerSession(authOptions)

  // const data: InvoiceTypes = await getInvoice()
  // console.log(data)
  console.log('PAGE SESSION', session)

  return (
    <div>
      <h1 className={`${titleFont.className} text-2xl`}>Home Page</h1>
    </div>
  )
}

export default HomePage
