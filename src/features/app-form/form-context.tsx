"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface FormData {
  // Lease Information
  commencementDate: Date | null
  leaseTerms: string
  publicGoods: string
  enquiries: string

  // Application Details
  firstName: string
  surname: string
  email: string
  mobile: string
  businessPhone: string
  dateOfBirth: Date | null
  country: string
  occupation: string
  photoIdentification: File | null
  idType: string
  idNumber: string
  idDocument: File | null
  residentialAddress: string
  residentialSuburb: string
  residentialState: string
  residentialPostcode: string
  postalAddress: string
  postalSuburb: string
  postalState: string
  postalPostcode: string
  solicitorCompany: string
  solicitorContact: string
  solicitorPhone: string
  solicitorMobile: string
  solicitorEmail: string

  // Entity Details
  businessDescription: string
  abnNumber: string
  acnNumber: string
  companyName: string
  directorFirstName: string
  directorSurname: string
  directorAddress: string
  directorSuburb: string
  directorState: string
  directorPostcode: string
  isBankrupt: string
  bankruptDetails: string
  bankruptDocument: File | null
  isTerminated: string
  terminationReason: string

  // Assets & Liabilities
  assets: Array<{ description: string; amount: string }>
  liabilities: Array<{ description: string; amount: string }>
  operatesBusiness: string
  isEmployed: string
  statementOfAssets: File | null

  // Rental History
  hasRented: string
  rentalType: string
  previousAddress: string
  previousSuburb: string
  previousState: string
  previousPostcode: string
  fromDate: Date | null
  toDate: Date | null

  // Trading Experience
  tradeCompanyName: string
  tradeAddress: string
  tradeReference1FirstName: string
  tradeReference1Surname: string
  tradeReference1Position: string
  tradeReference1Phone: string
  tradeReference1Email: string

  // Privacy Acknowledgment
  agreed: boolean
  signature: string
}

interface FormContextType {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  resetForm: () => void
  currentStep: number
  totalSteps: number
  goToNextStep: () => void
  goToPreviousStep: () => void
}

const initialFormData: FormData = {
  // Lease Information
  commencementDate: null,
  leaseTerms: "1",
  publicGoods: "no",
  enquiries: "",

  // Application Details
  firstName: "",
  surname: "",
  email: "",
  mobile: "",
  businessPhone: "",
  dateOfBirth: null,
  country: "",
  occupation: "",
  photoIdentification: null,
  idType: "license",
  idNumber: "",
  idDocument: null,
  residentialAddress: "",
  residentialSuburb: "",
  residentialState: "",
  residentialPostcode: "",
  postalAddress: "",
  postalSuburb: "",
  postalState: "",
  postalPostcode: "",
  solicitorCompany: "",
  solicitorContact: "",
  solicitorPhone: "",
  solicitorMobile: "",
  solicitorEmail: "",

  // Entity Details
  businessDescription: "",
  abnNumber: "",
  acnNumber: "",
  companyName: "",
  directorFirstName: "",
  directorSurname: "",
  directorAddress: "",
  directorSuburb: "",
  directorState: "",
  directorPostcode: "",
  isBankrupt: "no",
  bankruptDetails: "",
  bankruptDocument: null,
  isTerminated: "no",
  terminationReason: "",

  // Assets & Liabilities
  assets: [{ description: "", amount: "" }],
  liabilities: [{ description: "", amount: "" }],
  operatesBusiness: "no",
  isEmployed: "no",
  statementOfAssets: null,

  // Rental History
  hasRented: "no",
  rentalType: "residential",
  previousAddress: "",
  previousSuburb: "",
  previousState: "",
  previousPostcode: "",
  fromDate: null,
  toDate: null,

  // Trading Experience
  tradeCompanyName: "",
  tradeAddress: "",
  tradeReference1FirstName: "",
  tradeReference1Surname: "",
  tradeReference1Position: "",
  tradeReference1Phone: "",
  tradeReference1Email: "",

  // Privacy Acknowledgment
  agreed: false,
  signature: ""
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 8 

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setCurrentStep(1)
  }

  const goToNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  return (
    <FormContext.Provider value={{ 
      formData, 
      updateFormData, 
      resetForm,
      currentStep,
      totalSteps,
      goToNextStep,
      goToPreviousStep
    }}>
      {children}
    </FormContext.Provider>
  )
}

export function useForm() {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error("useForm must be used within a FormProvider")
  }
  return context
} 