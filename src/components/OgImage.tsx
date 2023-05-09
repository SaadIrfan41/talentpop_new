import Image from 'next/image'
import React, { Suspense } from 'react'
import useStepper from '@/stores/CustomerIntakeForm/useStepperStore'
import { useStoreHook } from '@/utils/useStoreHook'

export const config = {
  runtime: 'edge',
}
const OgImage = () => {
  const stepNumb = useStoreHook(useStepper, (state) => state.stepNumb)

  return (
    <Image
      fetchPriority='high'
      priority
      rel='preload'
      fill={true}
      className='  ml-auto h-full min-h-screen max-w-fit '
      src={`/step${stepNumb ? stepNumb : 1}.png`}
      alt='Loading Image'
    />
  )
}

export default OgImage
