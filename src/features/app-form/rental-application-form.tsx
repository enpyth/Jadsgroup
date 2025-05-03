"use client"

import { Card, CardContent, Container } from "@mui/material"
import LeaseInformation from "./form-sections/lease-information"
import ApplicationDetails from "./form-sections/application-details"
import EntityDetails from "./form-sections/entity-details"
import AssetsLiabilities from "./form-sections/assets-liabilities"
import RentalHistory from "./form-sections/rental-history"
import TradingExperience from "./form-sections/trading-experience"
import PrivacyAcknowledgment from "./form-sections/privacy-acknowledgment"
import FormProgress from "./form-progress"
import { PropertyInformation } from "./form-sections/property-information"
import FormNavigation from "./form-sections/form-navigation"
import { Property } from "@/constants/data"
import { useRouter } from "next/navigation"
import { User } from "next-auth"
import { FormProvider, useForm } from "./form-context"
import { getInitialState } from "@/constants/workflow"

function RentalApplicationFormContent({ property, user }: { property: Property, user: User }) {
  const router = useRouter()
  const { formData, currentStep, totalSteps, goToNextStep, goToPreviousStep } = useForm()

  const handleSubmit = async () => {
    try {
      // Upload ID document to Cloudflare R2
      let idDocumentUrl = null
      console.log('idDocument: ', formData.idDocument)
      if (formData.idDocument) {
        const uploadFormData = new FormData()
        uploadFormData.append('file', formData.idDocument)
        uploadFormData.append('fileName', `idDocument_${Date.now()}_${formData.idDocument.name}`)
        uploadFormData.append('email', user.email || 'anonymous')

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        })
        
        if (!uploadResponse.ok) {
          throw new Error('Failed to upload ID document')
        }
        
        const { url } = await uploadResponse.json()
        idDocumentUrl = url
      }

      // Calculate end date based on lease terms
      const startDate = formData.commencementDate || new Date()
      const endDate = new Date(startDate)
      endDate.setFullYear(endDate.getFullYear() + parseInt(formData.leaseTerms))

      // Create lease record
      const leaseResponse = await fetch('/api/leases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Core lease data matching the schema
          property_id: property.property_id,
          tenant_email: user.email,
          start_date: startDate.toISOString().split('T')[0], // Convert to YYYY-MM-DD format
          end_date: endDate.toISOString().split('T')[0], // Convert to YYYY-MM-DD format
          rent_amount: property.price,
          deposit_amount: property.price,
          state: getInitialState(),
          agreement_to_lease: "TODO: agreement_url",
          // Additional application data as JSON
          application_data: {
            personal_info: {
              first_name: formData.firstName,
              surname: formData.surname,
              mobile: formData.mobile,
              business_phone: formData.businessPhone,
              date_of_birth: formData.dateOfBirth?.toISOString(),
              country: formData.country,
              occupation: formData.occupation
            },
            identification: {
              type: formData.idType,
              number: formData.idNumber,
              id_document: idDocumentUrl
            },
            addresses: {
              residential: {
                address: formData.residentialAddress,
                suburb: formData.residentialSuburb,
                state: formData.residentialState,
                postcode: formData.residentialPostcode
              },
              postal: {
                address: formData.postalAddress,
                suburb: formData.postalSuburb,
                state: formData.postalState,
                postcode: formData.postalPostcode
              }
            },
            business_info: {
              description: formData.businessDescription,
              abn_number: formData.abnNumber,
              company_name: formData.companyName,
              director: {
                first_name: formData.directorFirstName,
                surname: formData.directorSurname,
                address: formData.directorAddress,
                suburb: formData.directorSuburb,
                state: formData.directorState,
                postcode: formData.directorPostcode
              }
            },
            financial_info: {
              assets: formData.assets,
              liabilities: formData.liabilities,
              operates_business: formData.operatesBusiness === "yes",
              is_employed: formData.isEmployed === "yes"
            },
            rental_history: {
              has_rented: formData.hasRented === "yes",
              type: formData.rentalType,
              previous_address: {
                address: formData.previousAddress,
                suburb: formData.previousSuburb,
                state: formData.previousState,
                postcode: formData.previousPostcode
              }
            },
            trade_reference: {
              company_name: formData.tradeCompanyName,
              address: formData.tradeAddress,
              contact: {
                first_name: formData.tradeReference1FirstName,
                surname: formData.tradeReference1Surname,
                position: formData.tradeReference1Position,
                phone: formData.tradeReference1Phone,
                email: formData.tradeReference1Email
              }
            },
            privacy_acknowledgment: {
              agreed: formData.agreed,
              signature: formData.signature
            }
          }
        })
      })

      if (!leaseResponse.ok) {
        console.error('Failed to create lease:', leaseResponse.statusText)
        throw new Error('Failed to create lease')
      }

      // Redirect to success page or dashboard
      router.push('/dashboard/lease')
    } catch (error) {
      console.error('Error submitting application:', error)
      // TODO: Show error message to user
    }
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <PropertyInformation property={property} />
            <LeaseInformation />
          </>
        )
      case 2:
        return <ApplicationDetails user={user} />
      case 3:
        return <EntityDetails />
      case 4:
        return <AssetsLiabilities />
      case 5:
        return <RentalHistory />
      case 6:
        return <TradingExperience />
      case 7:
        return <PrivacyAcknowledgment onAgreementChange={() => { }} />
      default:
        return null
    }
  }

  return (
    <Container maxWidth="md" disableGutters>
      <FormProgress currentStep={currentStep} totalSteps={totalSteps} />

      <Card sx={{ mt: 4, overflow: "visible", boxShadow: 3 }}>
        <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
          {renderCurrentStep()}

          <FormNavigation
            onSubmit={handleSubmit}
            isAgreed={formData.agreed && formData.signature.trim() !== ""}
          />
        </CardContent>
      </Card>
    </Container>
  )
}

export default function RentalApplicationForm({ property, user }: { property: Property, user: User }) {
  return (
    <FormProvider>
      <RentalApplicationFormContent property={property} user={user} />
    </FormProvider>
  )
}
