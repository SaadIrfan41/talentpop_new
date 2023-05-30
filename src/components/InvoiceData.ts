import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export const getInvoice = async () => {
  const session = await getServerSession(authOptions)
  //@ts-ignore
  const id = session?.user?.id
  if (!id) {
    return null
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/invoice?id=${id}`,
      {
        // next: { tags: [id] },
        // next: { revalidate: 10 },
      }
    )
    //   console.log(await res.json())
    return res.json()
  } catch (error) {
    console.log('Checkout error', error)
  }
}
