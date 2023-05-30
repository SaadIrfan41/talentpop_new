import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../prisma/prisma'

export async function DELETE(request: NextRequest, res: NextResponse) {
  //   const tag = request.nextUrl.searchParams.get('todos') as string
  const intakeformID = request.nextUrl.searchParams?.get(
    'intakeformID'
  ) as string
  const firstTimeInvoideID = request.nextUrl.searchParams?.get(
    'firstTimeInvoideID'
  ) as string
  const MonthlyInvoiceID = request.nextUrl.searchParams?.get(
    'MonthlyInvoiceID'
  ) as string

  //  const id = request.nextUrl.searchParams.get('id')
  // const [FirstTimeInvoice, MonthlyInvoice] = await prisma.$transaction([
  //   await prisma.customerIntakeForm.delete({
  //     where: {
  //       customer_id: id,
  //     },
  //   })
  // ])
  try {
    await prisma.$transaction([
      prisma.customerIntakeForm.delete({
        where: {
          customer_id: intakeformID,
        },
      }),
      prisma.firstTimeInvoice.delete({
        where: {
          customerId: intakeformID,
        },
      }),
      prisma.monthlyInvoice.delete({
        where: {
          customerId: intakeformID,
        },
      }),
      prisma.customer.update({
        where: {
          id: intakeformID,
        },
        data: {
          customer_intake_form_submited: false,
        },
      }),
    ])
    // await prisma.customerIntakeForm.delete({
    //   where: {
    //     customer_id: id,
    //   },
    // })
    // console.log(todo)
    // await fetch(`http://localhost:3000/api/revalidate?tag=todos`)
    return NextResponse.json(
      { Message: `CUSTOMER INTAKE FORM DELETED` },
      { status: 200 }
    )
  } catch (error) {
    console.log('ERRO IN DELETE', error)
  }
}
