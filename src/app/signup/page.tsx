'use client'
import SignUpForm from '@/components/signUpForm/form'
import { Bulp, HelpIcon, MessagesIcon } from '@/utils/Icons'
import { titleFont } from '@/utils/fonts'
import Image from 'next/image'

const SignupPage = () => {
  return (
    <div className='flex h-screen w-full '>
      <div className=' flex w-full  max-w-[5rem] flex-col justify-between border-r-2 border-[#DCDBE1]'>
        <div className='mt-10 flex flex-col items-center justify-center gap-y-4'>
          <Bulp />
          <div className=' h-40 w-[0.063rem] bg-[#4BBA39] ' />
        </div>
        <div className='mt-10 flex flex-col items-center justify-center gap-y-8'>
          <HelpIcon />
          <MessagesIcon />
        </div>
      </div>
      <div className='grid w-full   grid-cols-12 '>
        <div className=' col-span-11 mt-10 pl-10 md:pl-32  lg:col-span-6 lg:pl-10 2xl:pl-60'>
          <h1
            className={`${titleFont.className} mb-7 text-3xl font-bold text-[#69C920]`}
          >
            Create an Account
          </h1>
          <SignUpForm />
        </div>
        <div className='ml-auto hidden max-w-[692px] bg-green-200  md:col-span-6 lg:block'>
          <img
            className='aspect-[3/2] h-full w-full bg-gray-50 object-cover   lg:object-fill'
            src='/register.png'
            alt=''
          />
        </div>
      </div>
      {/* <div className='bg-blue-200 w-full max-w-[44.438rem] ml-16 mr-56 mt-10'>
        <h1
          className={`${titleFont.className} text-3xl font-bold text-[#69C920] mb-7`}
        >
          Create an Account
        </h1>
        <SignUpForm />
      </div>
      <div className=' bg-green-200 relative max-w-[692px] h-screen w-full '>
      
        <img
          className='aspect-[3/2] w-full bg-gray-50 object-cover lg:object-fill   h-full'
          src='/register.png'
          alt=''
        />
      </div> */}
    </div>
  )
}

export default SignupPage
