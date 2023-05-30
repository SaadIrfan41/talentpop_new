import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
export type FirstTimeInvoiceTypes = {
  num_of_agents: Number
  agent_working_days: Number
  agent_working_hours: Number
  setup_fee: Number
  is_payed: Boolean
}
export type MonthlyInvoiceTypes = {
  num_of_agents: Number
  agent_working_days: Number
  agent_working_hours: Number
  is_payed: Boolean
  payment_recurring_date: Date | null
}
type InvoiceTypes = {
  FirstTimeInvoice: FirstTimeInvoiceTypes
  MonthlyInvoice: MonthlyInvoiceTypes
}
export interface Invoice {
  invoice: InvoiceTypes
  getInvoice: () => void
}

const useInvoiceStore = create<Invoice>((set) => ({
  invoice: {
    FirstTimeInvoice: {
      num_of_agents: 0,
      agent_working_days: 0,
      agent_working_hours: 0,
      setup_fee: 0,
      is_payed: false,
    },
    MonthlyInvoice: {
      num_of_agents: 0,
      agent_working_days: 0,
      agent_working_hours: 0,
      is_payed: false,
      payment_recurring_date: null,
    },
  },
  getInvoice: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/invoice`,
        {
          next: { tags: ['invoice'] },
        }
      )
      const data: InvoiceTypes = await res.json()
      set({ invoice: data })
    } catch (error) {
      console.log(error)
    }
  },
}))

export default useInvoiceStore
