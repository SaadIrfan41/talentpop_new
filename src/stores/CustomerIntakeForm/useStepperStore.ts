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
  numOfAgents: number
  setNumAgents: (numOfAgents: number) => void
  agentWorkingHours: number
  setAgentWorkingHours: (agentWorkingHours: number) => void
  agentWorkingDays: number
  setAgentWorkingDays: (agentWorkingDays: number) => void
  genderPreference: string
  setGenderPreference: (genderPreference: string) => void
  escalation_contact_firstName: string
  setEscalation_contact_firstName: (
    escalation_contact_firstName: string
  ) => void
  escalation_contact_lastName: string
  setEscalation_contact_lastName: (escalation_contact_lastName: string) => void
  return_exchange_policy: string
  setReturn_exchange_policy: (return_exchange_policy: string) => void
  escalation_contact_email: string
  setEscalation_contact_email: (escalation_contact_email: string) => void
  ticket_tags: string
  setTicket_tags: (ticket_tags: string) => void
  agentsStartingDate: Date
  setAgentStartUpDate: (agentsStartingDate: Date) => void
  most_common_questions: JSON
  setMost_common_questions: (most_common_questions: JSON) => void
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
    numOfAgents: 0,
    setNumAgents: (numOfAgents) => set({ numOfAgents }),
    agentWorkingHours: 0,
    setAgentWorkingHours: (agentWorkingHours) => set({ agentWorkingHours }),
    agentWorkingDays: 0,
    setAgentWorkingDays: (agentWorkingDays) => set({ agentWorkingDays }),
    genderPreference: '',
    setGenderPreference: (genderPreference) => set({ genderPreference }),
    agentsStartingDate: new Date(),
    setAgentStartUpDate: (agentsStartingDate) => set({ agentsStartingDate }),
    most_common_questions: JSON,
    setMost_common_questions: (most_common_questions) =>
      set({ most_common_questions }),
    escalation_contact_firstName: '',
    setEscalation_contact_firstName: (escalation_contact_firstName) =>
      set({ escalation_contact_firstName }),
    escalation_contact_lastName: '',
    setEscalation_contact_lastName: (escalation_contact_lastName) =>
      set({ escalation_contact_lastName }),
    escalation_contact_email: '',
    setEscalation_contact_email: (escalation_contact_email) =>
      set({ escalation_contact_email }),
    ticket_tags: '',
    setTicket_tags: (ticket_tags) => set({ ticket_tags }),
    return_exchange_policy: '',
    setReturn_exchange_policy: (return_exchange_policy) =>
      set({ return_exchange_policy }),
  })
  //   {
  //     name: 'CIF-Stepper',
  //     storage: createJSONStorage(() => sessionStorage),
  //   }
  // )
)

export default useStepper
