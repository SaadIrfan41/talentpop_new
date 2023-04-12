import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
type StepperState = {
  stepNumb: number
  setStepNumb: (stepNumb: number) => void
  websiteURL: string
  firstName: string
  lastName: string
  email: string
  businessName: string
  businessAddress: string
  aboutBusiness: string
  tasks: string[]
  inboundPhoneSupport: string
  setWebsiteURL: (websiteURL: string) => void
  setFirstName: (firstName: string) => void
  setLastName: (lastName: string) => void
  setEmail: (email: string) => void
  setBusinessName: (businessName: string) => void
  setBusinessAddress: (businessAddress: string) => void
  setAboutBusiness: (aboutBusiness: string) => void
  setTasks: (tasks: string[]) => void
  setInboundPhoneSupport: (inboundPhoneSupport: string) => void
  customerServicePlatform: string
  setCustomerServicePlatform: (customerServicePlatform: string) => void
  platformNames: string[]
  setPlatformNames: (platformNames: string[]) => void
  ecommercePlatform: string[]
  setEcommercePlatform: (ecommercePlatform: string[]) => void
  qaSheetAvaliable: string
  setqaSheetAvaliable: (qaSheetAvaliable: string) => void
  qaSheet: File | null
  setQaSheet: (qaSheet: File | null) => void
  numAgents: number
  setNumAgents: (numAgents: number) => void
  agentWorkingHours: number
  setAgentWorkingHours: (agentWorkingHours: number) => void
  agentWorkingDays: number
  setAgentWorkingDays: (agentWorkingDays: number) => void
  genderPreference: string
  setGenderPreference: (genderPreference: string) => void
  agentsStartingDate: Date
  setAgentStartUpDate: (agentsStartingDate: Date) => void
}

const useStepper = create<StepperState, any[]>(
  // persist(
  (set) => ({
    stepNumb: 1,
    setStepNumb: (stepNumb) => set({ stepNumb }),
    websiteURL: '',
    firstName: '',
    lastName: '',
    email: '',
    businessName: '',
    businessAddress: '',
    aboutBusiness: '',
    tasks: [],
    inboundPhoneSupport: '',
    setWebsiteURL: (websiteURL) => set({ websiteURL }),
    setFirstName: (firstName) => set({ firstName }),
    setLastName: (lastName) => set({ lastName }),
    setEmail: (email) => set({ email }),
    setBusinessName: (businessName) => set({ businessName }),
    setBusinessAddress: (businessAddress) => set({ businessAddress }),
    setAboutBusiness: (aboutBusiness) => set({ aboutBusiness }),
    setTasks: (tasks) => set({ tasks }),
    setInboundPhoneSupport: (inboundPhoneSupport) =>
      set({ inboundPhoneSupport }),
    customerServicePlatform: '',
    setCustomerServicePlatform: (customerServicePlatform) =>
      set({ customerServicePlatform }),
    platformNames: [],
    setPlatformNames: (platformNames) => set({ platformNames }),
    ecommercePlatform: [],
    setEcommercePlatform: (ecommercePlatform) => set({ ecommercePlatform }),
    qaSheetAvaliable: '',
    setqaSheetAvaliable: (qaSheetAvaliable) => set({ qaSheetAvaliable }),
    qaSheet: null,
    setQaSheet: (qaSheet) => set({ qaSheet }),
    numAgents: 0,
    setNumAgents: (numAgents) => set({ numAgents }),
    agentWorkingHours: 0,
    setAgentWorkingHours: (agentWorkingHours) => set({ agentWorkingHours }),
    agentWorkingDays: 0,
    setAgentWorkingDays: (agentWorkingDays) => set({ agentWorkingDays }),
    genderPreference: '',
    setGenderPreference: (genderPreference) => set({ genderPreference }),
    agentsStartingDate: new Date(),
    setAgentStartUpDate: (agentsStartingDate) => set({ agentsStartingDate }),
  })
  //   {
  //     name: 'CIF-Stepper',
  //     storage: createJSONStorage(() => sessionStorage),
  //   }
  // )
)

export default useStepper
