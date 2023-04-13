'use client'
import React, { useRef, useState } from 'react'
import { Controller, useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CustomerIntakeFormStep2Types,
  CustomerIntakeformStep2Schema,
} from '@/utils/zodSchemas'
import { CalenderIcon, CarrotIcon, CheckIcon } from '@/utils/Icons'
const platformArray = ['Zendesk', 'Gorgias', 'Re-Amaze', 'Hubspot']
const EcommercePlatform = ['Facebook', 'Email']
import useClickOutside from '@/utils/useClickOutside'
import Flatpickr from 'react-flatpickr'
import useStepper from '@/stores/CustomerIntakeForm/useStepperStore'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useMediaQuery } from '@mantine/hooks'
const genders = ['Any', 'Male', 'Female']

const Step2 = () => {
  const [showPlateformArray, setShowPlateformArray] = useState(false)
  const [customPlateformName, setCustomPlateformName] = useState(false)
  const [showQA_Sheet, setShowQA_Sheet] = useState(false)
  const [showGender, setShowGender] = useState(false)
  const [selectedGender, setSelectedGender] = useState('')
  const [date, setDate] = useState<Date>()
  const DatePlaceholder = useMediaQuery('(min-width: 640px')

  const clickOutsideRef = useRef<HTMLDivElement>(null)
  useClickOutside(clickOutsideRef, () => {
    setShowGender(false)
  })
  const {
    register,
    handleSubmit,
    resetField,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CustomerIntakeFormStep2Types>({
    resolver: zodResolver(CustomerIntakeformStep2Schema),
    defaultValues: { platformName: [] },
  })
  const {
    setStepNumb,
    customerServicePlatform,
    setCustomerServicePlatform,
    platformNames,
    setPlatformNames,
    ecommercePlatform,
    setEcommercePlatform,
    qaSheetAvaliable,
    setqaSheetAvaliable,
    qaSheet,
    setQaSheet,
    numAgents,
    setNumAgents,
    agentWorkingHours,
    setAgentWorkingHours,
    agentWorkingDays,
    setAgentWorkingDays,
    genderPreference,
    setGenderPreference,
    agentsStartingDate,
    setAgentStartUpDate,
  } = useStepper((state) => state)
  const submitData = async (data: CustomerIntakeFormStep2Types) => {
    if (data.customPlatformName && data.platformName) {
      data.platformName.push(data.customPlatformName)
    }

    console.log(data)

    setCustomerServicePlatform(data.customerServicePlatformAvaliable)
    setPlatformNames(data.platformName ? data.platformName : [])
    setEcommercePlatform(data.ecommercePlatform)
    setqaSheetAvaliable(data.qaSheetAvaliable)
    setQaSheet(data.qaSheetAvaliable === 'true' ? data.qaSheet : null)
    setNumAgents(data.numOfAgents),
      setGenderPreference(data.genderPreference),
      setAgentStartUpDate(new Date(data.agentsStartingDate)),
      setAgentWorkingDays(data.agentWorkingDays)
    setAgentWorkingHours(data.agentWorkingHours)

    setStepNumb(3)
  }
  const [animateRef] = useAutoAnimate()

  return (
    <form
      //   ref={formRef}
      onSubmit={handleSubmit(submitData)}
      className={` flex flex-col gap-y-5 pb-16 `}
    >
      {/* CUSTOMER SERVICE PLATEFORM AVAILABILITY */}
      <div ref={animateRef} className='flex flex-col gap-y-2  '>
        <div ref={animateRef} className='flex flex-col'>
          <div className='flex items-center '>
            <span className=' w-full text-lg font-normal text-[#666666] '>
              Do You Have A Customer Service Platform In Place Already?
            </span>
            <button
              type='submit'
              disabled={isSubmitting}
              className=' hidden  h-[30px] w-[6.563rem] rounded-[10px] bg-[#8FD758] pb-1 text-xl font-bold text-white sm:block sm:text-xl   lg:hidden xl:block'
            >
              Next
            </button>
          </div>
          {errors.customerServicePlatformAvaliable && (
            <span className=' -mt-1 text-red-400 '>
              {errors.customerServicePlatformAvaliable.message}
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
              {...register('customerServicePlatformAvaliable')}
              value='Yes'
              onClick={() => {
                setShowPlateformArray(true)
              }}
            />
            <div className='text-white peer-checked:text-[#D0F289]'>
              <CheckIcon />
            </div>
            <span>Yes</span>
          </label>
        </div>
        <div className='w-full  text-lg  font-normal text-[#666666]  '>
          <label className='flex cursor-pointer items-center gap-x-3'>
            <input
              // defaultChecked={tasks[index] === task}
              // checked={tasks[index] === task}
              type='radio'
              className='peer sr-only'
              {...register('customerServicePlatformAvaliable')}
              value='No'
              onClick={() => {
                setShowPlateformArray(false),
                  resetField('platformName'),
                  resetField('customPlatformName')
              }}
            />
            <div className='text-white peer-checked:text-[#D0F289]'>
              <CheckIcon />
            </div>
            <span>No</span>
          </label>
        </div>
        {showPlateformArray && (
          <div ref={animateRef} className='flex flex-col gap-y-3 '>
            <div ref={animateRef} className='flex flex-col'>
              <h1 className=' w-full text-lg font-normal text-[#666666]'>
                What Platform do you use?
              </h1>
              {errors.platformName && (
                <span className=' text-red-400'>
                  {errors.platformName.message}
                </span>
              )}
            </div>
            <div className='flex flex-col gap-y-3 '>
              {platformArray.map((name, index) => (
                <div
                  className='w-full  text-lg    font-normal text-[#666666] outline-none transition-all duration-300'
                  key={index}
                >
                  <label className='flex cursor-pointer items-center gap-x-3'>
                    <input
                      type='checkbox'
                      className='peer sr-only'
                      {...register('platformName')}
                      value={name}
                    />
                    <div className='text-white peer-checked:text-[#D0F289]'>
                      <CheckIcon />
                    </div>
                    <span>{name}</span>
                  </label>
                </div>
              ))}
            </div>
            <div className='w-full  text-lg    font-normal text-[#666666] outline-none transition-all duration-300'>
              <label className='flex cursor-pointer items-center gap-x-3'>
                <input
                  onClick={() => {
                    setCustomPlateformName(!customPlateformName),
                      resetField('customPlatformName')
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

            {customPlateformName && (
              <div
                ref={animateRef}
                className='w-full  pl-8  text-lg   font-normal text-[#666666] outline-none transition-all duration-300'
              >
                <input
                  type='text'
                  {...register('customPlatformName')}
                  placeholder='Platform Name'
                  className='max-h-8 w-full max-w-[14.375rem] rounded-lg border  border-black/20 py-4 pl-3 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[#666666]'
                />
                {errors.customPlatformName && (
                  <span className=' text-red-400'>
                    {errors.customPlatformName.message}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {/* CUSTOMER SERVICE PLATEFORM */}

      {/* Ecommerce PlatformName */}
      <div className='flex flex-col gap-y-2 '>
        <div ref={animateRef} className='flex flex-col'>
          <h5 className=' w-full text-lg font-normal text-[#666666]'>
            What E-Commerce Platform Does Your Virtual Assistant Need Access To?
          </h5>
          {errors.ecommercePlatform && (
            <span className=' text-red-400'>
              {errors.ecommercePlatform.message}
            </span>
          )}
        </div>
        <div className='flex flex-col gap-y-3 '>
          {EcommercePlatform.map((name, index) => (
            <div
              className='w-full  text-lg    font-normal text-[#666666] outline-none transition-all duration-300'
              key={index}
            >
              <label className='flex cursor-pointer items-center gap-x-3'>
                <input
                  type='checkbox'
                  className='peer sr-only'
                  {...register('ecommercePlatform')}
                  value={name}
                />
                <div className='text-white peer-checked:text-[#D0F289]'>
                  <CheckIcon />
                </div>
                <span>{name}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/*QA SHEET AVAILABILITY */}

      <div ref={animateRef} className='flex flex-col gap-y-2  '>
        <div ref={animateRef} className='flex flex-col'>
          <span className=' w-full text-lg font-normal text-[#666666] '>
            Do You Have A Question/Answer Sheet Created Yet For
            <br /> Your Most Common Questions Created Yet?
          </span>
          {errors.qaSheetAvaliable && (
            <span className=' text-red-400 '>
              {errors.qaSheetAvaliable.message}
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
              {...register('qaSheetAvaliable')}
              value={'true'}
              onClick={() => {
                setShowQA_Sheet(true)
              }}
            />
            <div className='text-white peer-checked:text-[#D0F289]'>
              <CheckIcon />
            </div>
            <span>Yes</span>
          </label>
        </div>
        <div className='w-full  text-lg  font-normal text-[#666666]  '>
          <label className='flex cursor-pointer items-center gap-x-3'>
            <input
              // defaultChecked={tasks[index] === task}
              // checked={tasks[index] === task}
              type='radio'
              className='peer sr-only'
              {...register('qaSheetAvaliable')}
              value={'false'}
              onClick={() => {
                setShowQA_Sheet(false), resetField('qaSheet')
              }}
            />
            <div className='text-white peer-checked:text-[#D0F289]'>
              <CheckIcon />
            </div>
            <span>No</span>
          </label>
        </div>
        {showQA_Sheet && (
          <div className=' flex flex-col gap-y-2'>
            <div className='flex flex-col gap-y-2'>
              <div>
                <h5 className=' w-full text-lg font-normal text-[#666666]'>
                  Great! Can You Upload It Here For Our Team To Review And
                  Format
                  <br />
                  For Your Virtual Assistant?
                </h5>
                {errors.qaSheetAvaliable && (
                  <span className='pl-4 text-red-400 '>
                    {errors.qaSheetAvaliable.message}
                  </span>
                )}
              </div>
              <input
                type='file'
                accept='.pdf,.doc,.docx'
                // defaultValue={qaSheet}
                {...register('qaSheet')}
                placeholder='Great, Can You Tell Us A Little Bit About Your Business?'
                className='block w-full   text-sm
      text-slate-500 file:mr-4 file:rounded-xl
      file:border-0 file:bg-[#8FD758]
      file:px-4 file:py-2
      file:text-sm file:font-semibold
      file:text-white
      hover:file:cursor-pointer '
              />
              {errors.qaSheet && (
                //@ts-ignore
                <span className='text-red-400'>{errors.qaSheet?.message}</span>
              )}
            </div>
          </div>
        )}
      </div>
      {/* QA SHEET Upload */}

      {/* Number of Agents  */}
      <div className='flex flex-col gap-y-2  '>
        <div ref={animateRef} className='flex flex-col'>
          <span className=' w-full text-lg font-normal text-[#666666] '>
            How Many Customer Service Agents Are You Looking To Add To Your
            Team?
          </span>
          {errors.numOfAgents && (
            <span className=' text-red-400 '>{errors.numOfAgents.message}</span>
          )}
        </div>
        <div className='w-full text-lg font-normal text-[#666666] '>
          <label className='flex cursor-pointer items-center gap-x-3'>
            <input
              // defaultChecked={tasks[index] === task}
              // checked={tasks[index] === task}

              placeholder='Agents'
              type='number'
              {...register('numOfAgents', { valueAsNumber: true })}
              className=' max-w-[8.563rem] rounded-lg border-2 border-[#666666]/20 px-5 pb-3 pt-3 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[#666666]'
            />
          </label>
        </div>
      </div>

      {/* Agents Working Time  */}
      <div ref={animateRef} className='flex flex-col gap-y-2  '>
        <div className='flex flex-col'>
          <p className={`w-full text-lg font-normal text-[#666666]  `}>
            What Hours Would You Like Your Dedicated Agent To Be Working?
          </p>
          <span className=' w-full text-[15px]'>
            E.g (5 days, 8 hours per day)
          </span>
        </div>

        <div className='w-full  font-normal text-[#666666] '>
          <div className='flex  items-center gap-x-3'>
            <input
              // defaultChecked={tasks[index] === task}
              // checked={tasks[index] === task}

              placeholder='Days'
              type='number'
              {...register('agentWorkingDays', { valueAsNumber: true })}
              className=' max-w-[8.563rem] rounded-lg border-2 border-[#666666]/20 px-5 pb-3 pt-3 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[#666666]'
            />
            <input
              // defaultChecked={tasks[index] === task}
              // checked={tasks[index] === task}

              placeholder='Hours'
              type='number'
              {...register('agentWorkingHours', { valueAsNumber: true })}
              className=' max-w-[8.563rem] rounded-lg border-2 border-[#666666]/20 px-5 pb-3 pt-3 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[#666666]'
            />
          </div>
        </div>
        {errors.agentWorkingDays ? (
          <span className=' text-red-400 '>
            {errors.agentWorkingDays.message}
          </span>
        ) : (
          errors.agentWorkingHours && (
            <span className=' text-red-400 '>
              {errors.agentWorkingHours.message}
            </span>
          )
        )}
      </div>
      {/* Gender Selection */}
      <div ref={animateRef} className='relative flex flex-col gap-y-3'>
        <button
          onClick={() => setShowGender(!showGender)}
          type='button'
          className=' relative flex w-full max-w-[13.688rem] items-center justify-around gap-x-2 rounded-lg border border-black/20  px-2 py-4 text-start  text-lg font-normal text-[#666666] outline-none ring-black/20 ring-offset-2 active:ring-4 '
        >
          {selectedGender ? selectedGender : 'Choose Agent Gender?'}
          <CarrotIcon />
        </button>
        {errors.genderPreference && (
          <span className='text-red-400'>
            {errors.genderPreference.message}
          </span>
        )}
        {showGender && (
          <div
            ref={clickOutsideRef}
            className=' absolute bottom-0 flex w-full max-w-[13.688rem] flex-col gap-y-3 overflow-hidden rounded-xl border  border-black/20 bg-white  text-lg font-normal shadow-xl  '
          >
            {genders.map((gender, index) => (
              <div
                key={index}
                className=' px-4 py-2 hover:cursor-pointer hover:border-l-4  hover:border-[#8FD758]  hover:bg-green-50 hover:text-green-700 '
              >
                <label className='flex cursor-pointer items-center gap-x-3'>
                  <input
                    onClick={() => {
                      setSelectedGender(gender), setShowGender(false)
                    }}
                    type='radio'
                    className='peer sr-only'
                    {...register('genderPreference')}
                    value={gender}
                  />

                  <span>{gender}</span>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Agents Starting date */}

      <div ref={animateRef} className='relative flex max-w-lg flex-col gap-y-1'>
        <Flatpickr
          value={date}
          options={{
            minDate: 'today',
          }}
          onChange={([date]) => {
            setDate(date), setValue('agentsStartingDate', date.toISOString())
          }}
          placeholder={
            DatePlaceholder
              ? 'When Would You Like Your Agent(s) Up And Running?'
              : 'Agent Staring Date'
          }
          className='relative flex w-full max-w-lg  items-center justify-around gap-x-2 rounded-lg border border-black/20  px-2 py-4 text-start  text-lg font-normal text-[#666666] outline-none ring-black/20 ring-offset-2 active:ring-4'
        />
        <div className='pointer-events-none absolute right-5 top-3 '>
          <CalenderIcon />
        </div>
        {errors.agentsStartingDate && (
          <span className='text-red-400'>
            {' '}
            {errors.agentsStartingDate.message}
          </span>
        )}
      </div>

      {/* SUBMIT BUTTON SMALL SCREEN */}
      <button
        type='submit'
        disabled={isSubmitting}
        className=' rounded-xl bg-[#8FD758] px-8 py-1 text-2xl font-bold text-white sm:hidden  sm:text-2xl lg:block   xl:hidden'
      >
        Next
      </button>
    </form>
  )
}

export default Step2
