'use client'
import { titleFont } from '@/utils/fonts'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CustomerIntakeFormStep1Types,
  CustomerIntakeformStep1Schema,
} from '@/utils/zodSchemas'
import { CheckIcon } from '@/utils/Icons'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import useStepper from '@/stores/CustomerIntakeForm/useStepperStore'
const tasksArray = [
  'Email',
  'Live Chat',
  'SMS',
  "Social Media Comments/DM's",
  'Data Entry',
  'Influencer Outreach',
]
const Step1 = () => {
  const [customTask, setCustomTask] = useState(false)

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<CustomerIntakeFormStep1Types>({
    resolver: zodResolver(CustomerIntakeformStep1Schema),
  })

  const {
    setStepNumb,
    businessName,
    setBusinessName,
    firstName,
    setFirstName,
    websiteURL,
    setWebsiteURL,
    lastName,
    setLastName,
    email,
    setEmail,
    businessAddress,
    setBusinessAddress,
    aboutBusiness,
    setAboutBusiness,
    tasks,
    setTasks,
    inboundPhoneSupport,
    setInboundPhoneSupport,
  } = useStepper((state) => state)

  const submitData = async (data: CustomerIntakeFormStep1Types) => {
    if (data.customTask && data.tasks) {
      data.tasks.push(data.customTask)
    }
    console.log(data)
    setBusinessName(data.businessName)
    setFirstName(data.firstName)
    setLastName(data.lastName)
    setAboutBusiness(data.aboutBusiness)
    setBusinessAddress(data.businessAddress)
    setEmail(data.email)
    setLastName(data.lastName)
    setTasks(data.tasks),
      setInboundPhoneSupport(data.inboundPhoneSupport),
      setWebsiteURL(data.websiteURL)

    setStepNumb(2)
  }
  const [animateRef] = useAutoAnimate()

  return (
    <form
      //   ref={formRef}
      onSubmit={handleSubmit(submitData)}
      className={` flex flex-col gap-y-5 px-[5%] pb-16`}
    >
      <div className=' flex w-full gap-x-16  md:gap-x-40 xl:gap-x-32 2xl:gap-x-52 '>
        <h1
          className={`${titleFont.className} text-3xl font-bold text-[#69C920] `}
        >
          Customer Intake Form
        </h1>
        <button
          type='submit'
          disabled={isSubmitting}
          className=' hidden  h-[30px] w-[6.563rem] rounded-[10px] bg-[#8FD758] pb-1 text-xl font-bold text-white sm:block sm:text-xl   lg:hidden xl:block'
        >
          Next
        </button>
      </div>
      {/* Website URL */}
      <div ref={animateRef} className='flex flex-col'>
        <input
          type='text'
          {...register('websiteURL')}
          placeholder='Your Website'
          className={`  w-full max-w-md rounded-lg border  border-black/20 py-4 pl-3 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[#666666]   ${
            errors.websiteURL ? 'border-2 border-red-500' : ''
          }`}
        />
        {errors.websiteURL && (
          <span className='text-red-400'> {errors.websiteURL.message}</span>
        )}
      </div>
      {/* FirstName Last Name */}
      <div ref={animateRef} className='flex max-w-md justify-between gap-x-5 '>
        <div className='max-w-[12.5rem]'>
          <input
            type='text'
            {...register('firstName')}
            placeholder='First Name'
            className={`  w-full  rounded-lg border  border-black/20 px-3 py-4 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[#666666]   ${
              errors.firstName ? 'border-2 border-red-500' : ''
            }`}
          />
          {errors.firstName && (
            <span className='text-red-400'> {errors.firstName.message}</span>
          )}
        </div>
        {/* Last Name */}
        <div className='max-w-[12.5rem]'>
          <input
            type='text'
            {...register('lastName')}
            placeholder='Last Name'
            className={`  w-full rounded-lg border  border-black/20 px-3 py-4 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[#666666]   ${
              errors.lastName ? 'border-2 border-red-500' : ''
            }`}
          />
          {errors.lastName && (
            <span className='text-red-400'> {errors.lastName.message}</span>
          )}
        </div>
      </div>
      {/*Email */}
      <div ref={animateRef} className='flex flex-col'>
        <input
          type='email'
          {...register('email')}
          placeholder='Email'
          className={`  w-full max-w-md rounded-lg border  border-black/20 py-4 pl-3 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[#666666]   ${
            errors.email ? 'border-2 border-red-500' : ''
          }`}
        />
        {errors.email && (
          <span className='text-red-400'> {errors.email.message}</span>
        )}
      </div>
      {/* Legal Name of Business */}
      <div ref={animateRef} className='flex flex-col'>
        <input
          type='text'
          {...register('businessName')}
          placeholder='Legal Name of Business'
          className={`  w-full max-w-md rounded-lg border  border-black/20 py-4 pl-3 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[#666666]   ${
            errors.businessName ? 'border-2 border-red-500' : ''
          }`}
        />
        {errors.businessName && (
          <span className='text-red-400'> {errors.businessName.message}</span>
        )}
      </div>
      {/* Business Address */}
      <div ref={animateRef} className='flex flex-col'>
        <input
          type='text'
          {...register('businessAddress')}
          placeholder='Business Address'
          className={`  w-full max-w-md rounded-lg border   border-black/20 py-4 pl-3 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[#666666]   ${
            errors.businessAddress ? 'border-2 border-red-500' : ''
          }`}
        />
        {errors.businessAddress && (
          <span className='text-red-400'>
            {' '}
            {errors.businessAddress.message}
          </span>
        )}
      </div>
      {/* Short Description of your Business */}
      <div ref={animateRef} className='flex flex-col'>
        <textarea
          rows={7}
          {...register('aboutBusiness')}
          placeholder='Short Description of your Business'
          className={`  w-full max-w-md rounded-lg border  border-black/20 py-4 pl-3 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[#666666]  ${
            errors.aboutBusiness ? 'border-2 border-red-500' : ''
          }`}
        />
        {errors.aboutBusiness && (
          <span className='text-red-400'> {errors.aboutBusiness.message}</span>
        )}
      </div>
      {/* AGESNTS TASKS */}
      <div ref={animateRef} className='flex flex-col gap-y-3 '>
        <div ref={animateRef} className='flex flex-col'>
          <h5 className=' w-full text-lg font-normal text-[#666666]'>
            What Types of Tasks Will Your Agent Be Working On Day To Day?
          </h5>
          {errors.tasks && (
            <span className=' text-red-400'>{errors.tasks.message}</span>
          )}
        </div>
        <div className='flex flex-col gap-y-3 '>
          {tasksArray.map((task, index) => (
            <div
              className='w-full  text-lg    font-normal text-[#666666] outline-none transition-all duration-300'
              key={index}
            >
              <label className='flex cursor-pointer items-center gap-x-3'>
                <input
                  type='checkbox'
                  className='peer sr-only'
                  {...register('tasks')}
                  value={task}
                />
                <div className='text-white peer-checked:text-[#D0F289]'>
                  <CheckIcon />
                </div>
                <span>{task}</span>
              </label>
            </div>
          ))}
        </div>
        <div className='w-full  text-lg    font-normal text-[#666666] outline-none transition-all duration-300'>
          <label className='flex cursor-pointer items-center gap-x-3'>
            <input
              onClick={() => {
                setCustomTask(!customTask), resetField('customTask')
              }}
              type='checkbox'
              className='peer sr-only'
            />
            <div className='text-white peer-checked:text-[#D0F289]'>
              <CheckIcon />
            </div>
            <span>Other</span>
          </label>
        </div>

        {customTask && (
          <div className='w-full  pl-8  text-lg   font-normal text-[#666666] outline-none transition-all duration-300'>
            <input
              type='text'
              {...register('customTask')}
              placeholder='Task'
              className='h-8 w-full max-w-[14.375rem] rounded-lg border  border-black/20 px-3 py-3 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[#666666]'
            />
          </div>
        )}
      </div>

      {/* INBOUND PhoneCall Support*/}
      <div className='flex flex-col gap-y-2  '>
        <div ref={animateRef} className='flex flex-col'>
          <span className=' w-full text-lg font-normal text-[#666666] '>
            Do You Require Your Agent To Handle Inbound Phone Call Support?
            <br />
            (Please note that agents handling phone support are an additional $1
            an hour)
          </span>
          {errors.inboundPhoneSupport && (
            <span className=' text-red-400 '>
              {errors.inboundPhoneSupport.message}
            </span>
          )}
        </div>
        <div className='w-full text-lg font-normal text-[#666666] '>
          <label className='flex cursor-pointer items-center gap-x-3'>
            <input
              // defaultChecked={tasks[index] === task}
              // checked={tasks[index] === task}
              type='radio'
              className='peer sr-only'
              {...register('inboundPhoneSupport')}
              value='Yes'
            />
            <div className='text-white peer-checked:text-[#D0F289]'>
              <CheckIcon />
            </div>
            <span>Yes</span>
          </label>
        </div>
        <div
          ref={animateRef}
          className='w-full  text-lg  font-normal text-[#666666]  '
        >
          <label className='flex cursor-pointer items-center gap-x-3'>
            <input
              // defaultChecked={tasks[index] === task}
              // checked={tasks[index] === task}
              type='radio'
              className='peer sr-only'
              {...register('inboundPhoneSupport')}
              value='No'
            />
            <div className='text-white peer-checked:text-[#D0F289]'>
              <CheckIcon />
            </div>
            <span>No</span>
          </label>
        </div>
      </div>

      {/* SUBMIT BUTTON SMALL SCREEN */}
      <button
        ref={animateRef}
        type='submit'
        disabled={isSubmitting}
        className=' rounded-xl bg-[#8FD758] px-8 py-1 text-2xl font-bold text-white sm:hidden  sm:text-2xl lg:block   xl:hidden'
      >
        Next
      </button>
    </form>
  )
}

export default Step1
