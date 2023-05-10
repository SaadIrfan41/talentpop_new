import Image from 'next/image'
import React, { Suspense } from 'react'
import useStepper from '@/stores/CustomerIntakeForm/useStepperStore'
import { useStoreHook } from '@/utils/useStoreHook'
import Step1Img from '../../public/step1.png'
import Step2Img from '../../public/step2.png'

import Step3Img from '../../public/step3.png'

export const config = {
  runtime: 'edge',
}
const OgImage = () => {
  const stepNumb = useStoreHook(useStepper, (state) => state.stepNumb)

  return (
    <Image
      fetchPriority='high'
      priority
      placeholder='blur'
      // fill={true}
      className='  ml-auto  h-screen w-auto  '
      src={
        stepNumb === 1
          ? Step1Img
          : stepNumb === 2
          ? Step2Img
          : stepNumb === 3
          ? Step3Img
          : Step1Img
      }
      alt='Loading Image'
    />
    // <Image
    //   fetchPriority='high'
    //   priority
    //   fill={true}
    //   className='  ml-auto h-full min-h-screen w-auto  max-w-[650px]'
    //   src={`/step${stepNumb ? stepNumb : 1}.png`}
    //   alt='Loading Image'
    // />
  )
}

export default OgImage
