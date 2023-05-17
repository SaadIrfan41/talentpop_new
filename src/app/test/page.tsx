import { ProgressIconDown, ProgressIconUp } from '@/utils/Icons'
import React from 'react'

const page = () => {
  return (
    <div className=' relative'>
      <ol className='relative   grid grid-cols-10  grid-rows-2 text-sm '>
        <div className='absolute  top-[50%] h-[2px] w-full bg-[#69C920]' />
        {/*First item*/}
        <li className=' relative row-span-2 mt-auto'>
          <div>
            <div className=' flex flex-col  items-center '>
              <div className='absolute'>
                <ProgressIconDown />
              </div>
              {/* <div className=' absolute ml-10  h-12  w-[2px]  bg-[#69C920]' />
                    <div className='absolute  ml-[51px] mr-3 h-3 w-3 rounded-full bg-[#69C920] ' /> */}
            </div>
            <div className='ml-4 mt-2 pt-5 md:ml-0'>
              <h4 className='mb-1.5 '>New Agent</h4>
              <p className='mb-3 text-neutral-500 dark:text-neutral-300'>
                Request Submitted
              </p>
            </div>
          </div>
        </li>
        {/*Second item*/}
        <li className=' relative row-span-1'>
          <div>
            <div className=' flex flex-col items-center '>
              <div className='absolute bottom-0 right-5'>
                <ProgressIconUp />
              </div>
              <div className='ml-4 mt-2 pb-4 md:ml-0'>
                <h4 className='mb-1.5 '>Processing your</h4>
                <p className='mb-3 text-neutral-500 dark:text-neutral-300'>
                  requirements
                </p>
              </div>
            </div>
          </div>
        </li>
        {/*Third item*/}
        <li className=' relative row-span-2 mt-auto'>
          <div className=' flex flex-col  items-center '>
            <div className='absolute'>
              <ProgressIconDown />
            </div>
            {/* <div className=' absolute ml-10  h-12  w-[2px]  bg-[#69C920]' />
                  <div className='absolute  ml-[51px] mr-3 h-3 w-3 rounded-full bg-[#69C920] ' /> */}
          </div>
          <div className='ml-4 mt-2 pt-5 md:ml-0'>
            <h4 className='mb-1.5 '>Generating</h4>
            <p className='mb-3 text-neutral-500 dark:text-neutral-300'>
              Ideal Candidate Profiles
            </p>
          </div>
        </li>
      </ol>
    </div>
  )
}

export default page
