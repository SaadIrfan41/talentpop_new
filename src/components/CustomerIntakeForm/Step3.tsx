'use client'
import React, { useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CustomerIntakeFormStep3Types,
  CustomerIntakeformStep3Schema,
} from '@/utils/zodSchemas'
import { CheckIcon, CheckIconBlack } from '@/utils/Icons'
import useStepper from '@/stores/CustomerIntakeForm/useStepperStore'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const Step3 = () => {
  const router = useRouter()
  const { data: session, update } = useSession()
  // console.log(session)
  const [showPolicy, setShowPolicy] = useState(false)
  const {
    register,
    handleSubmit,
    resetField,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CustomerIntakeFormStep3Types>({
    resolver: zodResolver(CustomerIntakeformStep3Schema),
    defaultValues: {
      commonQuestions: [
        { question: '', percentage: 20 },
        { question: '', percentage: 20 },
        { question: '', percentage: 20 },
        { question: '', percentage: 20 },
        { question: '', percentage: 20 },
      ],
    },
  })
  //@ts-ignore
  const question = useWatch({
    control,
    name: 'commonQuestions',
  })

  // const stepperData = useStepper((state) => state)
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
    platformNames,
    ecommercePlatform,
    qaSheet,
    numOfAgents,
    agentWorkingHours,
    agentWorkingDays,
    genderPreference,
    agentsStartingDate,
    most_common_questions,
    escalation_contact_email,
    escalation_contact_firstName,
    escalation_contact_lastName,
    return_exchange_policy,
    ticket_tags,
    qaSheetAvaliable,
    setMost_common_questions,
    setReturn_exchange_policy,
    setEscalation_contact_firstName,
    setEscalation_contact_lastName,
    setEscalation_contact_email,
    setTicket_tags,
  } = useStepper((state) => state)
  const submitData = async (data: CustomerIntakeFormStep3Types) => {
    console.log(data)
    //@ts-ignore
    const commonQuestionsJson: JSON = JSON.stringify(data.commonQuestions)
    setMost_common_questions(commonQuestionsJson),
      setReturn_exchange_policy(data.returnPolicy || ''),
      setEscalation_contact_firstName(data.escalationContact.firstName),
      setEscalation_contact_lastName(data.escalationContact.lastName),
      setEscalation_contact_email(data.escalationContact.email),
      setTicket_tags(data.tags)

    const body = {
      businessName: businessName,

      firstName: firstName,

      websiteURL: websiteURL,

      lastName: lastName,

      email: email,

      businessAddress: businessAddress,

      aboutBusiness: aboutBusiness,

      tasks: tasks,

      inboundPhoneSupport: inboundPhoneSupport,

      customerServicePlatform: platformNames,

      ecommercePlatform: ecommercePlatform,

      qaSheet: qaSheet || '',

      numOfAgents: numOfAgents,

      agentWorkingHours: agentWorkingHours,

      agentWorkingDays: agentWorkingDays,

      genderPreference: genderPreference,

      agentsStartingDate: agentsStartingDate,

      returnPolicy: data.returnPolicy,

      commonQuestions: data.commonQuestions || most_common_questions,

      escalationContact: data.escalationContact,
      tags: data.tags,
    }
    console.log(qaSheetAvaliable)
    if (qaSheetAvaliable === 'true') {
      //@ts-ignore
      const file = qaSheet[0]
      //@ts-ignore
      const fileType = qaSheet[0]?.type

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/s3Upload?fileType=${fileType}`
      )

      const { uploadUrl, key } = data
      await axios.put(uploadUrl, file)
      // console.log('ObjectURL', `https://talentpop.s3.amazonaws.com/${key}`)
      body.qaSheet = `${process.env.NEXT_PUBLIC_AWS_S3_BASE_URL}/${key}`
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/customer-intake-form`,
        {
          method: 'POST',
          body: JSON.stringify({
            body,
          }),
        }
      )
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
      }
      // console.log(await res.json())
      const response = await res.json()
      await update({
        ...session,
        user: {
          ...session?.user,
          customerIntakeFormSubmited: response.formSubmited,
        },
      })
      router.push('/invoice')
    } catch (error) {
      console.log('ERROR INS RESPONSE', error)
    }
  }
  // console.log(errors)
  const [animateRef] = useAutoAnimate()

  return (
    <form
      //   ref={formRef}
      onSubmit={handleSubmit(submitData)}
      className={` flex flex-col gap-y-5 pb-16 `}
    >
      {/* REFUND POLICY AVAILABILITY */}
      <div ref={animateRef} className='flex flex-col gap-y-2  '>
        <div ref={animateRef} className='flex flex-col'>
          <div className='flex items-center '>
            <span className=' w-full text-lg font-normal text-[#666666] '>
              Can You Share Some Information On Your Return/Refund/Exchange
              Policy?
            </span>
            <button
              type='submit'
              disabled={isSubmitting}
              className=' hidden   rounded-[10px] bg-[#8FD758] pb-1 text-xl font-bold text-white disabled:cursor-not-allowed sm:block sm:text-xl   lg:hidden xl:block'
            >
              {isSubmitting ? (
                <div className='animate-pulse my-1 mr-3 h-full w-full text-center'>
                  Submitting...
                </div>
              ) : (
                <div className='my-1 h-full w-full px-3 text-center'>
                  Submit
                </div>
              )}
            </button>
          </div>
          {errors.returnPolicyAvaliable && (
            <span className=' text-red-400 '>
              {errors.returnPolicyAvaliable.message}
            </span>
          )}
        </div>
        <div className='text-md w-full font-normal text-[#666666] '>
          <label className='flex cursor-pointer items-center gap-x-3'>
            <input
              // defaultChecked={tasks[index] === task}
              // checked={tasks[index] === task}
              type='radio'
              className='peer sr-only'
              {...register('returnPolicyAvaliable')}
              value='Yes'
              onClick={() => {
                setShowPolicy(true)
              }}
            />
            <div className='text-white peer-checked:text-[#D0F289]'>
              <CheckIcon />
            </div>
            <span>Yes</span>
          </label>
        </div>
        <div className='text-md  w-full  font-normal text-[#666666]  '>
          <label className='flex cursor-pointer items-center gap-x-3'>
            <input
              // defaultChecked={tasks[index] === task}
              // checked={tasks[index] === task}
              type='radio'
              className='peer sr-only'
              {...register('returnPolicyAvaliable')}
              value='No'
              onClick={() => {
                setShowPolicy(false), resetField('returnPolicy')
              }}
            />
            <div className='text-white peer-checked:text-[#D0F289]'>
              <CheckIcon />
            </div>
            <span>No</span>
          </label>
        </div>
        {showPolicy && (
          <div ref={animateRef} className='flex flex-col gap-y-2'>
            <textarea
              rows={7}
              // defaultValue={returnPolicy}
              {...register('returnPolicy')}
              className={` w-full max-w-md rounded-lg border  border-black/20 px-3 py-4 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[#666666] ${
                errors.returnPolicy
                  ? 'border-2 border-red-500  focus:ring-0'
                  : ''
              }`}
            />
            {errors.returnPolicy && (
              <span className='text-red-400'>
                {' '}
                {errors.returnPolicy.message}
              </span>
            )}
          </div>
        )}
      </div>

      <div className='flex flex-col gap-y-5 '>
        <span className=' w-full text-lg font-normal text-[#666666] '>
          What Are The 5 Most Common Questions Customers Ask?
          <br />
          <span className=' w-full text-sm font-normal text-[#666666] '>
            Around What % Are These Questions In Comparison To The Total
            Customer Service Questions That Come In?
          </span>
        </span>
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className='flex flex-col gap-y-2'>
            <div className='  text-md  flex w-full gap-x-5 font-normal text-[#666666] outline-none transition-all duration-300'>
              <label
                className='relative flex w-full max-w-xl '
                htmlFor={`commonQuestions[${index}].question`}
              >
                <input
                  // ref={questionCheck}
                  className='relative w-full max-w-xl rounded-lg border 
                border-black/20  py-2 pl-10 pr-5  focus:border-[#8FD758] focus:outline-none focus:ring-2 focus:ring-[#8FD758]'
                  type='text'
                  id={`commonQuestions[${index}].question`}
                  //@ts-ignore
                  {...register(`commonQuestions[${index}].question`, {
                    required: true,
                  })}
                />
                <div className=' absolute inset-0 w-fit pb-1 pl-2 pt-2'>
                  <CheckIconBlack
                    fill={question[index].question ? '#8FD758' : '#9F9F9F'}
                  />
                </div>
              </label>
              <label
                className='relative flex text-center text-sm text-black   '
                htmlFor={`commonQuestions[${index}].percentage`}
              >
                <input
                  // ref={questionCheck}
                  // value={`${question[index].percentage}`}

                  className='relative h-10 w-10 rounded-full bg-[#B9C7B5] pr-2 text-center shadow-md shadow-black/50 focus:border-[#8FD758] focus:outline-none focus:ring-2 focus:ring-[#8FD758] '
                  type='number'
                  id={`commonQuestions[${index}].percentage`}
                  //@ts-ignore
                  {...register(`commonQuestions[${index}].percentage`, {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
                <span className='absolute inset-y-0 right-1 flex items-center '>
                  %
                </span>
              </label>
            </div>
            {errors.commonQuestions && (
              <span ref={animateRef} className=' text-red-400 '>
                {errors.commonQuestions[index]?.question?.message ||
                  errors.commonQuestions[index]?.percentage?.message}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className='flex flex-col gap-y-5  '>
        <div className='flex flex-col'>
          <p className={`w-full  text-lg font-normal text-[#666666] `}>
            Who Is The Best Point Of Contact To Share Updates With/Escalate Tier
            2 Support Tickets To?
          </p>
        </div>

        <div className='w-full   '>
          <div className='flex gap-x-5'>
            <div ref={animateRef} className=' flex flex-col gap-y-1'>
              <Controller
                name='escalationContact.firstName'
                defaultValue=''
                control={control}
                render={({ field }) => (
                  <input
                    className=' max-w-[12.25rem] rounded-lg border-2 border-[#666666]/20 py-3 pl-5 pr-2 font-normal  text-[#666666]  outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[#666666]'
                    placeholder='First Name'
                    type='text'
                    id='firstName'
                    {...field}
                  />
                )}
              />
              {errors.escalationContact?.firstName && (
                <span className=' text-red-400 '>
                  {errors.escalationContact.firstName.message}
                </span>
              )}
            </div>
            <div ref={animateRef} className=' flex flex-col gap-y-1'>
              <Controller
                defaultValue=''
                name='escalationContact.lastName'
                control={control}
                render={({ field }) => (
                  <input
                    className=' max-w-[12.25rem] rounded-lg border-2 border-[#666666]/20 py-3 pl-5 pr-2 font-normal  text-[#666666]  outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[#666666]'
                    placeholder='Last Name'
                    type='text'
                    id='lastName'
                    {...field}
                  />
                )}
              />
              {errors.escalationContact?.lastName && (
                <span className=' text-red-400 '>
                  {errors.escalationContact.lastName.message}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div ref={animateRef} className=' flex flex-col gap-y-1'>
        <Controller
          defaultValue=''
          name='escalationContact.email'
          control={control}
          render={({ field }) => (
            <input
              className=' w-full max-w-md rounded-lg border-2 border-[#666666]/20 pb-3 pl-5 pr-2  pt-3  outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[#666666]'
              placeholder='Email'
              type='email'
              id='email'
              {...field}
            />
          )}
        />
        {errors.escalationContact?.email && (
          <span className=' text-red-400 '>
            {errors.escalationContact.email.message}
          </span>
        )}
      </div>

      {/* List of Tags */}
      <div className='flex flex-col gap-y-5'>
        <p className={`w-full  text-lg font-normal text-[#666666] `}>
          Add a list of your tags currently being used in your Helpdesk platform
        </p>

        <div ref={animateRef} className='flex flex-col gap-y-1'>
          <textarea
            rows={5}
            {...register('tags')}
            placeholder='List of Tags for tickets'
            className={`  w-full max-w-md rounded-lg border  border-black/20 py-4 pl-3 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[#666666]  ${
              errors.tags ? 'border-2 border-red-500' : ''
            }`}
          />
          {errors.tags && (
            <span className='text-red-400'> {errors.tags.message}</span>
          )}
        </div>
      </div>

      {/* SUBMIT BUTTON SMALL SCREEN */}
      <button
        type='submit'
        disabled={isSubmitting}
        className=' rounded-xl bg-[#8FD758] px-8 py-1 text-2xl font-bold text-white sm:hidden  sm:text-2xl lg:block   xl:hidden'
      >
        {isSubmitting ? (
          <div role='status' className='flex items-center gap-x-2'>
            <span className='animate-pulse w-full text-center'>
              Submitting ...
            </span>
          </div>
        ) : (
          ' Submit'
        )}
      </button>
    </form>
  )
}

export default Step3
