import Stripe from 'stripe'
import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
})

export async function POST(request: NextRequest) {
  // console.log(await request.json())
  const { body } = await request.json()
  console.log(body)
  const hours = body.agent_working_hours
  const days = body.agent_working_days
  const billing_period = 2
  const numbOfAgents = body.num_of_agents
  const agentsTotalPrice = hours * days * billing_period * 8

  try {
    const session = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NODE_ENV === 'production',
    })
    if (!session)
      return NextResponse.json(
        { message: 'UNAUTHORIZED USER' },
        { status: 401 }
      )
    console.log(session)
    // Create Checkout Sessions from body params.
    const StripeSession = await stripe.checkout.sessions.create({
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
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Setup Fee (One Time)',
            },
            unit_amount: body.setup_fee * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/invoice`,
      customer: session?.stripeCustomerId as string,
      //    automatic_tax: { enabled: true },
    })
    return NextResponse.json({ url: StripeSession.url }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 400 })
  }
}
