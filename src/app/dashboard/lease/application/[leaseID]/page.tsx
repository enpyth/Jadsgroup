import { Container, Typography, Paper, Alert } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { getLeaseById } from "@/db/queries/leases"
import { IDDocumentDisplay } from "@/features/app-form/review/id-document-display"


interface ApplicationData {
  personal_info: {
    first_name: string
    surname: string
    mobile: string
    business_phone: string
    date_of_birth: string
    country: string
    occupation: string
  }
  identification: {
    type: string
    number: string
    id_document?: string
  }
  addresses: {
    residential: {
      address: string
      suburb: string
      state: string
      postcode: string
    }
    postal: {
      address: string
      suburb: string
      state: string
      postcode: string
    }
  }
  business_info: {
    description: string
    abn_number: string
    company_name: string
    director: {
      first_name: string
      surname: string
      address: string
      suburb: string
      state: string
      postcode: string
    }
  }
  financial_info: {
    assets: Array<{ description: string; amount: string }>
    liabilities: Array<{ description: string; amount: string }>
    operates_business: boolean
    is_employed: boolean
  }
  rental_history: {
    has_rented: boolean
    type: string
    previous_address: {
      address: string
      suburb: string
      state: string
      postcode: string
    }
  }
  trade_reference: {
    company_name: string
    address: string
    contact: {
      first_name: string
      surname: string
      position: string
      phone: string
      email: string
    }
  }
  privacy_acknowledgment: {
    agreed: boolean
    signature: string
  }
}

type PageProps = {
    params: Promise<{
        leaseID: string
    }>
}

export default async function LeaseFormPage({ params }: PageProps) {
  const resolvedParams = await params
  const leaseId = parseInt(resolvedParams.leaseID)
  const result = await getLeaseById(leaseId)
  const leaseData = result[0]

  if (!leaseData) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">No lease data found</Alert>
      </Container>
    )
  }

  const applicationData = leaseData.application_data as ApplicationData | null

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lease Application Form
      </Typography>
      <Paper elevation={0} sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid size={6}>
            <Typography variant="subtitle1" gutterBottom>
              Basic Information
            </Typography>
            <Grid container spacing={2}>
              <Grid size={6}>
                <Typography variant="body2" color="text.secondary">
                  Lease ID
                </Typography>
                <Typography variant="body1">{leaseData.lease_id}</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="body2" color="text.secondary">
                  Property ID
                </Typography>
                <Typography variant="body1">{leaseData.property_id}</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="body2" color="text.secondary">
                  Tenant Email
                </Typography>
                <Typography variant="body1">{leaseData.tenant_email}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid size={6}>
            <Typography variant="subtitle1" gutterBottom>
              Dates
            </Typography>
            <Grid container spacing={2}>
              <Grid size={6}>
                <Typography variant="body2" color="text.secondary">
                  Start Date
                </Typography>
                <Typography variant="body1">
                  {leaseData.start_date}
                </Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="body2" color="text.secondary">
                  End Date
                </Typography>
                <Typography variant="body1">
                  {leaseData.end_date}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid size={12}>
            <Typography variant="subtitle1" gutterBottom>
              Financial Information
            </Typography>
            <Grid container spacing={2}>
              <Grid size={6}>
                <Typography variant="body2" color="text.secondary">
                  Rent Amount
                </Typography>
                <Typography variant="body1">
                  ${leaseData.rent_amount}
                </Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="body2" color="text.secondary">
                  Deposit Amount
                </Typography>
                <Typography variant="body1">
                  ${leaseData.deposit_amount}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid size={12}>
            <Typography variant="subtitle1" gutterBottom>
              Agreement to Lease
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="body2">{leaseData.agreement_to_lease}</Typography>
            </Paper>
          </Grid>

          {applicationData && (
            <>
              <Grid size={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Application Data
                </Typography>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="body2" component="pre" sx={{ margin: 0, whiteSpace: "pre-wrap" }}>
                    {JSON.stringify(applicationData, null, 2)}
                  </Typography>
                </Paper>
              </Grid>

              {applicationData.identification?.id_document && (
                <Grid size={12}>
                  <IDDocumentDisplay documentUrl={applicationData.identification.id_document} />
                </Grid>
              )}
            </>
          )}
        </Grid>
      </Paper>
    </Container>
  )
} 