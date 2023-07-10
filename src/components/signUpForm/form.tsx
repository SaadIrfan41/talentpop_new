'use client'
import { titleFont } from '@/utils/fonts'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Create_Account_Schema, RegisterUserTypes } from '@/utils/zodSchemas'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { signIn, SignInResponse } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

const SignUpForm = () => {
  const [animateRef] = useAutoAnimate()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUserTypes>({
    resolver: zodResolver(Create_Account_Schema),
  })

  const submitData = async (data: RegisterUserTypes) => {
    console.log(data)

    try {
      const res: SignInResponse | undefined = await signIn('credentials', {
        redirect: false,
        company_name: data.company_name,
        phone_number: data.phone_number,
        password: data.password,
        action: 'register',
      })
      // console.log('Response', res)
      if (res?.error) {
        console.log(res.error)

        return toast.error(res.error)
      }
      // toast.success('Account created Successfull')
      // console.log(res)
      toast.success('Logged In Successfully')
      reset()
      // console.log('BASE URL', process.env.NEXT_PUBLIC_BASE_URL)
      if (process.env.NEXT_PUBLIC_BASE_URL) {
        router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/customerintakeform`)
      }
    } catch (error) {
      toast.error((error as { message: string }).message)
      console.log((error as { message: string }).message)
    }
  }
  return (
    <form
      //   ref={formRef}
      onSubmit={handleSubmit(submitData)}
      className={` flex max-w-md flex-col gap-y-8  `}
    >
      {/* Company Name */}
      <div ref={animateRef}>
        <input
          type='text'
          {...register('company_name')}
          placeholder='Company Name'
          className={`  w-full rounded-lg border  border-black/20 py-4 pl-3 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[#666666]   ${
            errors.company_name ? 'border-2 border-red-500' : ''
          }`}
        />
        {errors.company_name && (
          <span className='text-red-400'> {errors.company_name.message}</span>
        )}
      </div>
      {/* Phone Number */}
      <div ref={animateRef}>
        <input
          type='text'
          {...register('phone_number')}
          placeholder='Phone number'
          className={`  w-full rounded-lg border  border-black/20 py-4 pl-3 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[#666666]   ${
            errors.phone_number ? 'border-2 border-red-500' : ''
          }`}
        />
        {errors.phone_number && (
          <span className='text-red-400'> {errors.phone_number.message}</span>
        )}
      </div>
      {/* Password */}
      <div ref={animateRef}>
        <input
          type='password'
          {...register('password')}
          placeholder='Password'
          className={`  w-full rounded-lg border  border-black/20 py-4 pl-3 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[#666666]   ${
            errors.password ? 'border-2 border-red-500' : ''
          }`}
        />
        {errors.password && (
          <span className='text-red-400'> {errors.password.message}</span>
        )}
      </div>
      {/* GOOGLE SUBMIT Button */}
      <div className=' flex justify-center space-x-10'>
        <button
          type='button'
          disabled={isSubmitting}
          className='  rounded-xl bg-[#F0F0F0] bg-opacity-75 px-3 py-2 text-xl font-bold text-black shadow-md outline-none disabled:cursor-no-drop lg:px-6 lg:text-2xl'
        >
          {/* {isSubmitting ? (
            <div role='status' className='flex items-center gap-x-2'>
              <span className='animate-pulse w-full text-center'>
                Loading ...
              </span>
            </div>
          ) : ( */}
          <div className='flex gap-x-2 '>
            <span>Sign Up with</span>
            <img src='/googleIcon.svg' alt='' />
          </div>
          {/* )} */}
        </button>
        {/* SUBMIT Button */}

        <button
          type='submit'
          disabled={isSubmitting}
          className=' rounded-xl bg-[#69C920]/75 px-5 py-2 text-xl font-bold text-white shadow-md  outline-none disabled:cursor-no-drop lg:px-6 lg:text-2xl'
        >
          {isSubmitting ? (
            <div role='status' className='flex items-center gap-x-2'>
              <span className='animate-pulse w-full text-center'>
                Loading ...
              </span>
            </div>
          ) : (
            'Submit'
          )}
        </button>
      </div>
    </form>
  )
}

export default SignUpForm
