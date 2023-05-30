import { NextResponse, NextRequest } from 'next/server'

import { getToken } from 'next-auth/jwt'
import { prisma } from '../../../../prisma/prisma'

export async function GET(request: NextRequest) {
  try {
    // const session = await getToken({
    //   //@ts-ignore
    //   req: request,
    //   secret: process.env.NEXTAUTH_SECRET,
    //   secureCookie: process.env.NODE_ENV === 'production',
    // })
    let id
    if (request.nextUrl.searchParams?.has('id')) {
      id = request.nextUrl.searchParams?.get('id')
    }
    console.log('ID', id)

    const invoice = await prisma.invoice.findFirst({
      where: {
        customerId: id || '',
      },
      select: {
        FirstTimeInvoice: {
          select: {
            id: true,
            num_of_agents: true,
            agent_working_hours: true,
            agent_working_days: true,
            setup_fee: true,
            is_payed: true,
          },
        },
        MonthlyInvoice: {
          select: {
            id: true,

            num_of_agents: true,
            agent_working_hours: true,
            agent_working_days: true,
            payment_recurring_date: true,
            is_payed: true,
          },
        },
      },
    })

    return NextResponse.json(invoice, { status: 200 })
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 400 })
  }
}
