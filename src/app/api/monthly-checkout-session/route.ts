import Stripe from 'stripe'
import { NextResponse, NextRequest } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
})

export async function POST(request: Request) {
  const hours = 5
  const days = 5
  const billing_period = 2
  const numbOfAgents = 5
  const agentsTotalPrice = hours * days * billing_period * 8
  const customerID = 'cus_NxAEf1SBI0Yb0o'
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Agents',
            },
            unit_amount: agentsTotalPrice * 100,
          },
          quantity: numbOfAgents,
        },
        // {
        //   price_data: {
        //     currency: 'usd',
        //     product_data: {
        //       name: 'Setup Fee (One Time)',
        //     },
        //     unit_amount: 50000,
        //   },
        //   quantity: 1,
        // },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancelled`,
      customer: customerID,
      //    automatic_tax: { enabled: true },
    })
    return NextResponse.json({ url: session.url }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 400 })
  }
}
