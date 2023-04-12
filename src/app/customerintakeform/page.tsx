'use client'
import Stepper from '@/components/CustomerIntakeForm/Stepper'
import useStepper from '@/stores/CustomerIntakeForm/useStepperStore'
import { Bulp, HelpIcon, MessagesIcon } from '@/utils/Icons'
import { useStoreHook } from '@/utils/useStoreHook'
import React, { useEffect, useState } from 'react'

const CustomerIntakeFormPage = () => {
  const stepNumb = useStoreHook(useStepper, (state) => state.stepNumb)
  const setStepNumb = useStepper((state) => state.setStepNumb)

  return (
    <div className='flex  '>
      <div className='relative w-[5rem]   '>
        <div className='  fixed bottom-0 left-0 top-0 flex w-[5rem] flex-col justify-between border-r-2 border-[#DCDBE1]'>
          <div className='mt-10 flex flex-col items-center justify-center gap-y-6 '>
            <Bulp />

            <div className='relative flex flex-col items-center '>
              <div
                // onClick={() => setStepNumb(1)}
                className={`relative z-10 flex h-8 w-8  items-center justify-center rounded-full  ${
                  stepNumb && stepNumb > 0 ? 'bg-[#4BBA39]' : 'bg-[#CDCDCD]'
                } text-base font-semibold text-white`}
              >
                1
              </div>
              <div
                className={` h-10 w-[0.1rem] ${
                  stepNumb && stepNumb > 0 ? 'bg-[#4BBA39]' : 'bg-[#CDCDCD]'
                } `}
              />
              <div
                // onClick={() => setStepNumb(2)}
                className={`relative z-10 flex h-8 w-8  items-center justify-center rounded-full  ${
                  stepNumb && stepNumb > 1 ? 'bg-[#4BBA39]' : 'bg-[#CDCDCD]'
                } text-base font-semibold text-white`}
              >
                2
              </div>
              <div
                className={` h-10 w-[0.1rem] ${
                  stepNumb && stepNumb > 1 ? 'bg-[#4BBA39]' : 'bg-[#CDCDCD]'
                } `}
              />

              <div
                // onClick={() => setStepNumb(3)}
                className={`relative z-10 flex h-8 w-8  items-center justify-center rounded-full  ${
                  stepNumb && stepNumb > 2 ? 'bg-[#4BBA39]' : 'bg-[#CDCDCD]'
                } text-base font-semibold text-white`}
              >
                3
              </div>
            </div>
          </div>
          <div className='mt-10 flex flex-col items-center justify-center gap-y-8'>
            <HelpIcon />
            <MessagesIcon />
          </div>
        </div>
      </div>
      <div className='grid w-full grid-cols-12   gap-x-5 '>
        <div className=' col-span-12 mt-10  pl-10  pr-5   lg:col-span-6  lg:pl-6 '>
          <Stepper />
        </div>
        {stepNumb && (
          <div className=' relative ml-auto hidden w-full  lg:col-span-5 lg:block'>
            <div className='fixed 2xl:right-0 '>
              <img
                className='  mx-auto  h-full min-h-screen  w-full bg-gray-50  '
                src={`/step${stepNumb}.png`}
                alt='Loading Image'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomerIntakeFormPage