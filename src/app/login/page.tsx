import LoginForm from '@/components/LoginForm/form'
import Image from 'next/image'
import Logo from '../../../public/talentpop.png'

import React from 'react'

const page = () => {
  return (
    <div className='grid h-screen place-content-center '>
      <Image
        priority={true}
        width={244}
        height={48}
        src={Logo}
        alt='TalentPop'
        className=' -ml-3 mb-6 object-contain'
      />

      <h1 className=' mb-5 text-4xl font-black text-[#69C920] text-opacity-80'>
        Log in
      </h1>
      <LoginForm />

      <span className='ml-1 mt-5 text-lg font-normal text-[#69C920]'>
        Forgot password?
      </span>
    </div>
  )
}

export default page
