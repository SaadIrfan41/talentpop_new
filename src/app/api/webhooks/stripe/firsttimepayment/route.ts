import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRETE as string
import { headers } from 'next/headers'
import { prisma } from '../../../../../../prisma/prisma'
// export const config = {
//   api: {
//     bodyParser: false, // don't parse body of incoming requests because we need it raw to verify signature
//   },
// }
export const dynamic = 'auto'

export async function POST(req: NextRequest, res: NextResponse) {
  const headersList = headers()

  try {
    const requestBuffer = await req.text()
    const sig = headersList.get('stripe-signature')
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2022-11-15',
    })

    let event

    try {
      if (!sig || !endpointSecret) {
        return new Response(`Webhook Signature Or Endpoint Secret is Missing`, {
          status: 400,
        })
      }
      // Use the Stripe SDK and request info to verify this Webhook request actually came from Stripe
      event = stripe.webhooks.constructEvent(
        requestBuffer.toString(), // Stringify the request for the Stripe library
        sig,
        endpointSecret
      )
    } catch (err: any) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message)
      return new Response(`Webhook Signature Or Endpoint Secret is Missing`, {
        status: 400,
      })
    }

    // Handle the event
    switch (event.type) {
      // Handle successful subscription creation
      case 'checkout.session.completed': {
        const data = event.data.object
        // console.log('checkout.session.completed', event.data.object)
        // const customer = event.data.object as Stripe.Customer
        // console.log('Customer', customer['customer'])
        //@ts-ignore
        const customerData = await stripe.customers.retrieve(data.customer)
        console.log(customerData.id)
        const currentDate = new Date()
        const payment_recurring_date = new Date(
          currentDate.getTime() + 14 * 24 * 60 * 60 * 1000
        )
        // const subscription = event.data.object as Stripe.Subscription

        const customer = await prisma.customer.findUnique({
          where: { stripeCustomerId: customerData.id },
          include: {
            invoice: {
              include: { FirstTimeInvoice: true, MonthlyInvoice: true },
            },
          },
        })
        await prisma.firstTimeInvoice.update({
          where: { id: customer?.invoice?.FirstTimeInvoice?.id },
          data: {
            is_payed: true,
          },
        })
        await prisma.monthlyInvoice.update({
          where: { id: customer?.invoice?.MonthlyInvoice?.id },
          data: {
            payment_recurring_date,
          },
        })
        // await fetch(`http://localhost:3000/api/revalidate?tag=invoice`)

        break
      }

      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    // Return a 200 response to acknowledge receipt of the event
    return new Response('payment confirmation route received', {
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return new Response(`Webhook error: ${error}`, {
      status: 400,
    })
  }
}
