'use client'
import * as React from 'react'
import { useForm } from 'react-hook-form'

const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log('change', event.target.value)
}

export default function App() {
  const {
    register,
    handleSubmit,
    resetField,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm()
  const submitData = async (data: any) => {
    alert(JSON.stringify(data))

    // try {

    // } catch (error) {
    //   console.log(error)
    // }
  }
  const [customPlateformName, setCustomPlateformName] = React.useState('')
  console.log(watch('platformName'))
  console.log('Get Values', getValues('platformName'))
  return (
    <form onSubmit={handleSubmit(submitData)}>
      <label>
        <input type='checkbox' value='Apple' {...register('platformName')} />{' '}
        Apple
      </label>
      <label>
        <input type='checkbox' value='Cherry' {...register('platformName')} />{' '}
        Cherry
      </label>
      <label>
        <input
          type='checkbox'
          value='Watermelon'
          {...register('platformName')}
        />{' '}
        Watermelon
      </label>
      <label>
        <input
          type='checkbox'
          value='Raspberry'
          {...register('platformName')}
        />{' '}
        Raspberry
      </label>
      <label>
        <input
          type='checkbox'
          value={customPlateformName}
          {...register('platformName')}
        />{' '}
        Banana
      </label>
      <input
        type='text'
        onChange={(e) => {
          setCustomPlateformName(e.target.value),
            setValue(`platformName[${0}]`, e.target.value)
        }}
        placeholder='Platform Name'
        className='max-h-8 w-full max-w-[14.375rem] rounded-lg border  border-black/20 py-4 pl-3 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[#666666]'
      />

      {errors.fruit && <p>{errors.fruit.message}</p>}
      <input type='submit' />
    </form>
  )
}
