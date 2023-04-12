'use client'
import { titleFont } from '@/utils/fonts'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Create_Account_Schema, RegisterUserTypes } from '@/utils/zodSchemas'
const SignUpForm = () => {
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
      //   const res: SignInResponse | undefined = await signIn('credentials', {
      //     redirect: false,
      //     companyName: data.companyName,
      //     companyEmail: data.companyEmail,
      //     password: data.password,
      //     phoneNumber: data.phoneNumber,
      //     dateOfBirth: data.dateOfBirth,
      //     companySize: data.companySize,
      //     action: 'register',
      //   })
      //   console.log('Response', res)
      //   if (res?.error) {
      //     return toast.error(res.error)
      //   }
      //   toast.success('Account created Successfull')
      //   console.log(res)
      //   reset()
      // console.log('BASE URL', process.env.NEXT_PUBLIC_BASE_URL)
      //   if (process.env.NEXT_PUBLIC_BASE_URL) {
      //     router.push(process.env.NEXT_PUBLIC_BASE_URL)
      //   }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form
      //   ref={formRef}
      onSubmit={handleSubmit(submitData)}
      className={` flex flex-col gap-y-8 max-w-md `}
    >
      {/* Company Name */}
      <div>
        <input
          type='text'
          {...register('companyName')}
          placeholder='Company Name'
          className={`  w-full rounded-lg border  border-black/20 py-4 pl-3 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[#666666]   ${
            errors.companyName ? 'border-2 border-red-500' : ''
          }`}
        />
        {errors.companyName && (
          <span className='text-red-400'> {errors.companyName.message}</span>
        )}
      </div>
      {/* Phone Number */}
      <div>
        <input
          type='text'
          {...register('phoneNumber')}
          placeholder='Phone number'
          className={`  w-full rounded-lg border  border-black/20 py-4 pl-3 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[#666666]   ${
            errors.phoneNumber ? 'border-2 border-red-500' : ''
          }`}
        />
        {errors.phoneNumber && (
          <span className='text-red-400'> {errors.phoneNumber.message}</span>
        )}
      </div>
      {/* Phone Number */}
      <div>
        <input
          type='text'
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
      <div className=' justify-center space-x-10 flex'>
        <button
          type='submit'
          disabled={isSubmitting}
          className='  rounded-xl bg-[#F0F0F0] bg-opacity-75 py-2 lg:px-6 px-3 text-xl lg:text-2xl font-bold text-black shadow-md outline-none disabled:cursor-no-drop'
        >
          {isSubmitting ? (
            <div role='status' className='flex items-center gap-x-2'>
              <span className='w-full animate-pulse text-center'>
                Loading ...
              </span>
            </div>
          ) : (
            <div className='flex gap-x-2 '>
              <span>Sign Up with</span>
              <img src='/googleIcon.svg' alt='' />
            </div>
          )}
        </button>
        {/* SUBMIT Button */}

        <button
          type='submit'
          disabled={isSubmitting}
          className=' rounded-xl bg-[#69C920]/75 py-2 lg:px-6 px-5 text-xl lg:text-2xl font-bold  text-white shadow-md outline-none disabled:cursor-no-drop'
        >
          {isSubmitting ? (
            <div role='status' className='flex items-center gap-x-2'>
              <span className='w-full animate-pulse text-center'>
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
