import { compare, hash } from 'bcryptjs'
import NextAuth, { NextAuthOptions } from 'next-auth'
import { prisma } from '../../../../../prisma/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import { Customer } from '@prisma/client'
// import { loadStripe } from '@stripe/stripe-js'
import Stripe from 'stripe'
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        company_name: {
          label: 'Company Name',
          type: 'text',
        },

        password: { label: 'Password', type: 'password' },
        phone_number: { label: 'Phone Number', type: 'text' },
      },
      //@ts-ignore
      async authorize(credentials) {
        //@ts-ignore
        if (credentials?.action === 'login')
          return loginUser(credentials?.phone_number, credentials?.password)
        //@ts-ignore
        if (credentials?.action === 'register')
          // console.log('CREDENTIALS', credentials)
          //@ts-ignore
          return registerUser(
            //@ts-ignore
            credentials?.company_name,
            //@ts-ignore
            credentials?.phone_number,
            //@ts-ignore
            credentials?.password
          )
      },
    }),
  ],
  pages: {
    signIn: '/login',
    // signOut: '/login',
  },
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   console.log(url);
    //   return url.startsWith(baseUrl)
    //     ? Promise.resolve(url)
    //     : Promise.resolve(baseUrl)
    // },

    //@ts-ignore
    async session({ session, token }) {
      // console.log('Session Callback', { session, token })
      // const customer = await prisma.customer.findUnique({
      //   where: {
      //     id: token.sub,
      //   },
      //   // select: { password: false },
      // })
      // if (customer) {
      //   const c = customer as Customer
      //   return {
      //     ...session,
      //     user: {
      //       id: c.id,
      //       phoneNumber: c.phone_number,
      //       customerIntakeFormSubmited: c.customer_intake_form_submited,
      //       stripeCustomerId: c.stripeCustomerId,
      //     },
      //   }
      // }
      // return session
      return {
        ...session,
        user: {
          id: token.id,
          phoneNumber: token.phoneNumber,
          customerIntakeFormSubmited: token.customerIntakeFormSubmited,
          stripeCustomerId: token.stripeCustomerId,
          isSubscribed: token.isSubscribed,
        },
      }
    },

    jwt: ({ token, user, trigger, session }) => {
      // console.log('JWT Callback', { token })
      // console.log('JWT Callback USER', { user })
      if (trigger === 'update') {
        return { ...token, ...session.user }
      }
      if (user) {
        const u = user as Customer
        return {
          ...token,
          id: user.id,
          phoneNumber: u.phone_number,
          customerIntakeFormSubmited: u.customer_intake_form_submited,
          stripeCustomerId: u.stripeCustomerId,

          // isSubscribed: u.isSubscribed,
        }
      }
      return token
    },
  },
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key]
  }
  return user
}

const loginUser = async (phone_number: string, password: string) => {
  if (!phone_number || !password) {
    throw new Error('Invalid Credentials')
  }

  try {
    const user = await prisma.customer.findFirst({
      where: {
        phone_number,
      },
    })

    if (!user) {
      throw new Error('User Does Not Exist')
    }
    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new Error('Invalid Credentials')
    }
    const userWithoutPassword = exclude(user, ['password'])
    console.log(userWithoutPassword)
    return {
      id: userWithoutPassword.id,
      phone_number: userWithoutPassword.phone_number,
      company_name: userWithoutPassword.company_name,
      customer_intake_form_submited:
        userWithoutPassword.customer_intake_form_submited,
      stripeCustomerId: userWithoutPassword.stripeCustomerId,
      // isSubscribed: userWithoutPassword.isSubscribed,
    }
  } catch (error: any) {
    throw new Error(error)
  }
}

const registerUser = async (
  company_name: string,
  phone_number: string,
  password: string
) => {
  try {
    if (phone_number === '' || company_name === '' || password === '') {
      throw new Error('Invalid Credentials')
    }

    const checkCustomer = await prisma.customer.findUnique({
      where: {
        phone_number,
      },
    })

    if (checkCustomer) {
      throw new Error('This User Allready Exist')
    }

    const cryptedPassword = await hash(password, 12)
    const newCustomer = await prisma.customer.create({
      data: {
        phone_number,
        password: cryptedPassword,
        company_name,
      },
    })

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2022-11-15',
    })
    // Create a stripe customer for the user with their email address
    await stripe.customers
      .create({
        phone: newCustomer.phone_number!,
      })
      .then(async (customer) => {
        // Use the Prisma Client to update the user in the database with their new Stripe customer ID
        return prisma.customer.update({
          where: { id: newCustomer.id },
          data: {
            stripeCustomerId: customer.id,
          },
        })
      })
    return {
      id: newCustomer.id,
      phone_number: newCustomer.phone_number,
      company_name: newCustomer.company_name,

      customer_intake_form_submited: newCustomer.customer_intake_form_submited,
      stripeCustomerId: newCustomer.stripeCustomerId,
      // isSubscribed: newCustomer.isSubscribed,
    }
  } catch (error: any) {
    throw new Error(error)
  }
}
