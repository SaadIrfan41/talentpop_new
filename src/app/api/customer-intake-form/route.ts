import { NextResponse, NextRequest } from 'next/server'

import { z, ZodType } from 'zod'

import { headers, cookies } from 'next/headers'
import { getToken } from 'next-auth/jwt'
import { prisma } from '../../../../prisma/prisma'

const CustomerIntakeformSchema = z.object({
  websiteURL: z
    .string()
    .url({ message: 'URL Should be like (https://www.example.com)' })
    .nonempty('Website URL is required'),
  firstName: z.string().trim().nonempty('First name is required'),
  lastName: z.string().trim().nonempty('Last name is required'),
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),

  businessName: z.string().trim().nonempty('Business name is required'),
  businessAddress: z.string().trim().nonempty('Business address is required'),
  aboutBusiness: z.string().trim().nonempty('Short Description is required'),
  tasks: z
    .array(z.string(), {
      required_error: 'Select atleast one task',
      invalid_type_error: 'Tasks are required',
    })
    .nonempty('Select atleast One Task'),
  customTask: z.string().trim().default('').optional(),

  inboundPhoneSupport: z.string({
    required_error: 'This Field is required',
    invalid_type_error: 'This Field is required',
  }),
  // customerServicePlatformAvaliable: z.string({
  //   required_error: 'This Field is required',
  //   invalid_type_error: 'This Field is required',
  // }),
  customerServicePlatform: z
    .array(
      z.string({
        required_error: 'This Field is required',
        invalid_type_error: 'This Field is required',
      })
    )
    .default([])
    .optional(),
  // customPlatformName: z.string().trim().optional(),
  ecommercePlatform: z
    .array(
      z.string({
        required_error: 'This Field is required',
        invalid_type_error: 'This Field is required',
      }),
      {
        required_error: 'This Field is required',
        invalid_type_error: 'This Field is required',
      }
    )
    .nonempty('This Field is required'),
  // qaSheetAvaliable: z.string({
  //   required_error: 'This Field is required',
  //   invalid_type_error: 'This Field is required ',
  // }),
  qaSheet: z.string().optional(),
  numOfAgents: z
    .number({
      invalid_type_error: 'This Field is required',
      required_error: 'This Field is required',
    })
    .min(1),
  agentWorkingDays: z
    .number({
      invalid_type_error: 'Days Field is required',
      required_error: 'Days Field is required',
    })
    .min(1, { message: 'Invalid days' })
    .max(7, { message: 'Invalid days' }),
  agentWorkingHours: z
    .number({
      invalid_type_error: 'Hours Field is required',
      required_error: 'Hours Field is required',
    })
    .min(1, { message: 'Invalid hours' })
    .max(24, { message: 'Invalid hours' }),

  genderPreference: z
    .string({
      required_error: 'This Field is required',
      invalid_type_error: 'This Field is required',
    })
    .nonempty('Select One Option'),
  agentsStartingDate: z.string({
    required_error: 'This Field is required',
    invalid_type_error: 'INVALID TYPE',
  }),
  // returnPolicyAvaliable: z.string({
  //   required_error: 'This Field is required',
  //   invalid_type_error: 'This Field is required',
  // }),

  returnPolicy: z
    .string()
    .trim()
    .refine(
      (value) => {
        if (value) {
          return value.length > 0
        }
        return false
      },
      {
        message: 'Enter your Refund Policy',
      }
    )
    .optional(),
  commonQuestions: z.array(
    z.object({
      question: z.string().trim().nonempty('This is a Required Field'),
      percentage: z
        .number()
        .min(1, { message: 'Minimun Value is 1%' })
        .max(100, { message: 'Maximum Value is 100%' }),
    })
  ),
  escalationContact: z.object({
    firstName: z.string().trim().nonempty('First name is required'),
    lastName: z.string().trim().nonempty('Last name is required'),
    email: z
      .string()
      .email('Invalid email address')
      .nonempty('Email is required'),
  }),
  tags: z.string().trim().nonempty('Tags are required'),
})

// const allowedFormats = [
//   'application/pdf',
//   'application/msword',
//   'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
// ]
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

// type CustomerIntakeFormStep4Types = z.infer<typeof CustomerIntakeformSchema>

export async function POST(request: NextRequest) {
  // console.log('FORM DATA', await request.json())
  // console.log('HELLO World')
  const { body } = await request.json()
  console.log(body)
  // console.log('BODY', await request.json())
  // return NextResponse.json(res, { status: 200 })
  try {
    const res = CustomerIntakeformSchema.safeParse(body)
    console.log('SERVER RESPONSE', res)
    if (!res.success) {
      const formatted = res.error.format()
      console.log('Formated', formatted)
      return NextResponse.json(
        {
          Error: formatted._errors,
          businessName: formatted.businessName?._errors,

          firstName: formatted.firstName?._errors,

          websiteURL: formatted.websiteURL?._errors,

          lastName: formatted.lastName?._errors,

          email: formatted.email?._errors,

          businessAddress: formatted.businessAddress?._errors,

          aboutBusiness: formatted.aboutBusiness?._errors,

          tasks: formatted.tasks?._errors,

          inboundPhoneSupport: formatted.inboundPhoneSupport?._errors,

          customerServicePlatform: formatted.customerServicePlatform?._errors,

          // platformName: formatted.platformName?._errors,

          ecommercePlatform: formatted.ecommercePlatform?._errors,

          // qaSheetAvaliable: formatted.qaSheetAvaliable?._errors,

          qaSheet: formatted.qaSheet?._errors,

          numOfAgents: formatted.numOfAgents?._errors,

          agentWorkingHours: formatted.agentWorkingHours?._errors,

          agentWorkingDays: formatted.agentWorkingDays?._errors,

          genderPreference: formatted.genderPreference?._errors,

          agentsStartingDate: formatted.agentsStartingDate?._errors,

          returnPolicy: formatted.returnPolicy?._errors,

          commonQuestions: formatted.commonQuestions?._errors,

          escalationContact: formatted.escalationContact?._errors,
        },
        { status: 400 }
      )
    }
    const {
      websiteURL,
      firstName,
      lastName,
      email,
      businessName,
      businessAddress,
      aboutBusiness,
      tasks,
      inboundPhoneSupport,
      ecommercePlatform,
      qaSheet,
      numOfAgents,
      agentWorkingDays,
      agentWorkingHours,
      agentsStartingDate,
      genderPreference,
      customerServicePlatform,

      returnPolicy,

      commonQuestions,

      escalationContact,
      tags,
    } = res.data

    const mostCommonQuestions = JSON.stringify(commonQuestions)
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
    const form = await prisma.customerIntakeForm.create({
      data: {
        customer_id: session?.sub as string,
        website_url: websiteURL,
        first_name: firstName,

        last_name: lastName,

        email: email,

        business_name: businessName,

        business_address: businessAddress,

        about_business: aboutBusiness,

        tasks: tasks,

        inbound_phone_support: inboundPhoneSupport,

        customer_service_platform: customerServicePlatform,

        ecommerce_platforms: ecommercePlatform,
        qa_sheet_url: qaSheet,
        num_of_agents: numOfAgents,
        agent_working_days: agentWorkingDays,
        agent_working_hours: agentWorkingHours,

        gender_preference: genderPreference,

        agents_starting_Date: agentsStartingDate,

        return_exchange_policy: returnPolicy,

        most_common_questions: mostCommonQuestions,

        escalation_contact_firstName: escalationContact.firstName,
        escalation_contact_lastName: escalationContact.lastName,
        escalation_contact_email: escalationContact.email,
        ticket_tags: tags,
      },
    })
    const hours = form.agent_working_hours
    const days = form.agent_working_days
    const billing_period = 2
    const numbOfAgents = form.num_of_agents
    const agentsTotalPrice = hours * days * billing_period * 8 * numbOfAgents
    const agentsPriceAfterTax = (13 / 100) * agentsTotalPrice
    //  const agentsPriceAfterTaxRounded = Math.round(agentsPriceAfterTax * 100) / 100
    const [FirstTimeInvoice, MonthlyInvoice] = await prisma.$transaction([
      prisma.firstTimeInvoice.create({
        data: {
          customerId: session?.sub as string,
          num_of_agents: numbOfAgents,
          agent_working_days: days,
          agent_working_hours: hours,
          setup_fee: 500,
          tax: 13,
          total_with_tax: agentsPriceAfterTax,
          total_without_tax: agentsTotalPrice,
        },
      }),
      prisma.monthlyInvoice.create({
        data: {
          customerId: session?.sub as string,
          num_of_agents: form.num_of_agents,
          agent_working_days: days,
          agent_working_hours: hours,
          total_with_tax: agentsPriceAfterTax,
          total_without_tax: agentsTotalPrice,
          tax: 13,
        },
      }),
    ])
    const Invoice = await prisma.invoice.create({
      data: {
        customerId: session?.sub as string,
        firstTimeInvoiceId: FirstTimeInvoice.id,
        monthlyInvoiceId: MonthlyInvoice.id,
      },
    })
    const updatedCustomer = await prisma.customer.update({
      where: {
        id: session?.sub as string,
      },
      data: {
        customer_intake_form_submited: true,
      },
    })
    return NextResponse.json(
      {
        formSubmited: updatedCustomer.customer_intake_form_submited,
        invoice: Invoice,
      },
      { status: 200 }
    )
    // return NextResponse.json({ formSubmited: 'ALL IS WELL' }, { status: 200 })
  } catch (e: any) {
    console.log('ERROR', e)
    // if (e instanceof Prisma.PrismaClientKnownRequestError) {
    //   if (e.code === 'P2002') {
    //     console.log(
    //       'There is a unique constraint violation, a new user cannot be created with this email'
    //     )
    //   }
    // }
    return NextResponse.json({ message: e.message }, { status: 400 })
  }
}

export async function GET(request: Request) {
  try {
    const session = await getToken({
      //@ts-ignore
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NODE_ENV === 'production',
    })

    const form = await prisma.customerIntakeForm.findUnique({
      where: {
        customer_id: session?.sub as string,
      },
    })

    return NextResponse.json(form, { status: 200 })
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 400 })
  }
}
