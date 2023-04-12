import { z } from 'zod'
export const Create_Account_Schema = z.object({
  companyName: z
    .string()
    .min(2, 'Company Name must contain at least 2 character(s)')
    .max(30, 'Company Name must contain at most 30 character(s)'),
  phoneNumber: z
    .string()
    .trim()
    .min(10, 'PhoneNumber must contain at least 10 Digit(s)')
    .max(20, 'PhoneNumber must contain at least 30 Digit(s)')
    .regex(/^\d+$/, { message: 'Invalid Number' }),
  password: z
    .string()
    .min(2, 'Password must contain at least 7 character(s)')
    .max(30, 'Password must contain at most 30 character(s)'),
})

export type RegisterUserTypes = z.infer<typeof Create_Account_Schema>

export const CustomerIntakeformStep1Schema = z.object({
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
})
export const CustomerIntakeformStep2Schema = z.object({
  customerServicePlatformAvaliable: z.string({
    required_error: 'This Field is required',
    invalid_type_error: 'This Field is required',
  }),
  platformName: z
    .array(
      z.string({
        required_error: 'This Field is required',
        invalid_type_error: 'This Field is required',
      })
    )
    .default([])
    .optional(),
  customPlatformName: z.string().trim().optional(),
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
  qaSheetAvaliable: z.string({
    required_error: 'This Field is required',
    invalid_type_error: 'This Field is required ',
  }),
  qaSheet: z
    .any()
    .refine(
      (file) => {
        if (file?.length !== 0) {
          return file?.[0]?.size <= 1000000
        }
        return true
      },
      { message: 'Max file size is 1MB.' }
    )
    .refine(
      (file) => {
        if (file?.length !== 0) {
          return allowedFormats.includes(file?.[0]?.type)
        }
        return true
      },
      { message: 'Only PDF and DOC Files Allowed' }
    )
    .optional(),
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
  // platformName: z
  //   .string().trim()
  //   .refine(
  //     (value) => {
  //       if (value) {
  //         return value.length > 0
  //       }
  //       return false
  //     },
  //     {
  //       message: 'Enter your Platform Name',
  //     }
  //   )
  //   .optional(),
})

const allowedFormats = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

export const CustomerIntakeformStep3Schema = z.object({
  returnPolicyAvaliable: z.string({
    required_error: 'This Field is required',
    invalid_type_error: 'This Field is required',
  }),

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

export type CustomerIntakeFormStep1Types = z.infer<
  typeof CustomerIntakeformStep1Schema
>
export type CustomerIntakeFormStep2Types = z.infer<
  typeof CustomerIntakeformStep2Schema
>
export type CustomerIntakeFormStep3Types = z.infer<
  typeof CustomerIntakeformStep3Schema
>
