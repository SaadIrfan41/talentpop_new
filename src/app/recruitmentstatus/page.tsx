import {
  ChartIcon,
  ChatIcon,
  ChatSearchIcon,
  DashboardIcon,
  DeskIcon,
  FormIcon,
  HeadphonesIcon,
  PipeIcon,
  ProgressIconDown,
  ProgressIconUp,
  SettingsIcon,
  Sign_in_CircleIcon,
  StatusListIcon,
  UploadIcon,
  UserAddIcon,
  UserCircleIcon,
} from '@/utils/Icons'
import React from 'react'
import { InvoiceTypes } from '../invoice/page'
import { getInvoice } from '@/components/InvoiceData'
import { redirect } from 'next/navigation'

const recruitmentProcess = [
  {
    id: 1,
    line1: 'New Agent ',
    line2: 'Request Submitted',
    completed: true,
  },
  {
    id: 2,
    line1: 'Processing your  ',
    line2: 'requirements',
    completed: true,
  },
  {
    id: 3,
    line1: 'Generating ',
    line2: 'Ideal Candidate Profiles',
    completed: false,
  },
  {
    id: 4,
    line1: 'Candidate Profiles Ready ',
    line2: ' for Review!',
    completed: false,
  },
  {
    id: 5,
    line1: 'Review Call',
    line2: 'CSM: Andrew Stephens',
    completed: false,
  },
  {
    id: 6,
    line1: 'Review Macros Created',
    line2: ' by TP',
  },
  {
    id: 7,
    line1: 'Share  ',
    line2: 'Helpdesk Login/Credential',
    completed: false,
  },
  {
    id: 8,
    line1: 'Schedule Live Training',
    line2: ' for Agent',
    completed: false,
  },
  {
    id: 9,
    line1: 'Share  ',
    line2: 'Helpdesk Login/Credential',
    completed: false,
  },
  {
    id: 10,
    line1: 'Agent Successfully  ',
    line2: 'Onboarded',
    completed: false,
  },
]
const RecruitmentStatusPage = async () => {
  const today = Date.now()
  const data: InvoiceTypes = await getInvoice()
  if (data.FirstTimeInvoice.is_payed) {
    if (data.MonthlyInvoice.payment_recurring_date) {
      if (
        new Date(data.MonthlyInvoice.payment_recurring_date) < new Date(today)
      ) {
        redirect('/invoice')
      }
    }
  } else {
    redirect('/invoice')
  }

  return (
    <div className=' flex h-full'>
      <div className='relative w-[94px]'>
        <nav className='fixed  bottom-0 left-0 top-0  flex h-full   max-w-[94px] flex-col   bg-[#D1FFAD]/75  px-3'>
          <div className='flex-grow'>
            <button>
              <StatusListIcon />
            </button>
            <button>
              <DashboardIcon />
            </button>
            <button>
              <ChatSearchIcon />
            </button>
            <button>
              <DeskIcon />
            </button>
            <button>
              <ChatIcon />
            </button>
            <button>
              <ChartIcon />
            </button>
            <button>
              <PipeIcon />
            </button>
          </div>
          <div>
            <button>
              <SettingsIcon />
            </button>
            <button>
              <UserCircleIcon />
            </button>
          </div>
        </nav>
      </div>
      <div className=' mt-20 h-full w-full flex-grow'>
        <div className='  ml-10 mr-16  rounded-xl bg-[#FAFAFA] pb-20 pl-3 pr-14 pt-1 shadow-xl'>
          <div className='flex text-3xl font-bold'>
            <UserAddIcon />
            <h2 className='-ml-[50px] mt-5 text-[#69C920]'>
              Recruitment Status
            </h2>
          </div>

          <div className=' relative'>
            <ol className='relative   grid grid-cols-10 grid-rows-2  text-sm  font-light text-black'>
              <div className='absolute  top-[50%] h-[2px] w-full bg-[#69C920]' />
              {recruitmentProcess.map(
                ({ id, line1, line2, completed }, index) => (
                  <div
                    className={
                      index % 2 == 0
                        ? 'relative row-span-2 mt-auto '
                        : 'relative row-span-1 '
                    }
                    key={index}
                  >
                    {index % 2 == 0 ? (
                      <div>
                        <div className=' flex flex-col  items-center '>
                          <div className='absolute'>
                            <ProgressIconDown />
                          </div>
                        </div>
                        <div className='ml-4 mt-2 pt-5 md:ml-0'>
                          <h4 className='mb-1.5 '>{line1}</h4>
                          <p className='mb-3'>{line2}</p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className=' flex flex-col items-center '>
                          <div className='absolute -bottom-[7px] right-5'>
                            <ProgressIconUp />
                          </div>
                          <div className='ml-4 mt-2 pb-4 md:ml-0'>
                            <h4 className='mb-1.5 '>{line1}</h4>
                            <p className='mb-3 '>{line2}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              )}
            </ol>
          </div>

          {/* <div className='relative flex'>
            <div className='absolute ml-10 mr-14 mt-12 h-[2px] w-full bg-[#69C920]' />
            <div></div>
          </div> */}

          {/* <div className=' relative grid grid-cols-10  grid-rows-2  bg-black'>
            <div className='absolute  top-[50%] h-[2px] w-full bg-[#69C920]' /> */}
          {/* <div className='absolute  top-[50%] h-[2px] w-full bg-[#69C920]' />
            <div className='relative  bg-red-300 after:absolute after:-top-[5px] after:h-1 after:w-full after:bg-pink-500 after:content-[""] '>
              <div className=' absolute bottom-0 right-0  top-[-10%]  h-3 w-3 rounded-full bg-[#69C920]' />

              <div
                className={`  absolute bottom-0 right-[5px] h-9 w-[2px]   bg-[#69C920]`}
              />
              <div className='    '>
                New Agent
                <br /> Request Submitted
              </div>
            </div> */}

          {/* <div className='relative row-span-2 bg-red-300'>
              <div className='    '>
                New Agent
                <div className=' absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#69C920]' />
                <br /> Request Submitted
              </div>
            </div>

            <div className='relative bg-blue-300'>
              <div className=' mt-10 '>
                Processing your
                <div className=' absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#69C920]' />
                <div className=' absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#69C920]' />
                <br /> requirements
              </div>
            </div> */}
          {/* {recruitmentProcess.map(
              ({ id, line1, line2, completed }, index) => (
                <div
                  key={id}
                  className={` ${
                    index % 2 == 0
                      ? 'row-span-2  mt-auto bg-red-300  '
                      : ' row-span-1  bg-emerald-300 '
                  }   relative text-sm font-normal`}
                >
                  <div
                    className={` ${
                      index % 2 == 0 ? 'top-[-10%]  ' : ' bottom-[-15%] '
                    } absolute right-0 h-3 w-3 rounded-full bg-[#69C920]`}
                  />
                  <div
                    className={` ${
                      index % 2 == 0 ? ' ' : '  '
                    } absolute right-[5px] h-14  w-[2px]   bg-[#69C920]`}
                  />
                  <div
                    className={` relative ${
                      index % 2 == 0 ? ' bg-purple-400  ' : 'bg-purple-700   '
                    }  `}
                  >
                    <div
                      className={` ${index % 2 == 0 ? ' mt-7 ' : ' mb-5  '} `}
                    >
                      <p>{line1}</p>
                      <p>{line2}</p>
                    </div>
                  </div>
                </div>
              )
            )} */}
          {/* </div> */}
        </div>
        <div className=' ml-12 mt-12  space-y-3 text-lg font-normal text-[#808080]'>
          <div className='flex items-center gap-x-3'>
            <HeadphonesIcon />
            <span>Book a call with your CSM</span>
          </div>
          <div className='flex items-center gap-x-3'>
            <UploadIcon />
            <span>Upload training documents/fAQ’s</span>
          </div>
          <div className='flex items-center gap-x-3'>
            <FormIcon />
            <span>Review the Macros File Created by TalentPop</span>
          </div>
          <div className='flex items-center gap-x-3'>
            <Sign_in_CircleIcon />
            <span>Connect your helpdesk to Unleash reporting</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecruitmentStatusPage
