import { Container, Typography, Paper, Grid, Alert } from "@mui/material"
import { getLeaseById } from "@/db/queries/leases"
import { type InferSelectModel } from "drizzle-orm"
import { leases } from "@/db/schema"

type LeaseData = InferSelectModel<typeof leases>

export default async function LeaseFormPage({ params }: { params: { leaseID: string } }) {
  const leaseId = parseInt(params.leaseID)
  const result = await getLeaseById(leaseId)
  const leaseData = result[0]

  if (!leaseData) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">No lease data found</Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lease Application Form
      </Typography>
      <Paper elevation={0} sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Basic Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Lease ID
                </Typography>
                <Typography variant="body1">{leaseData.lease_id}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Property ID
                </Typography>
                <Typography variant="body1">{leaseData.property_id}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Tenant Email
                </Typography>
                <Typography variant="body1">{leaseData.tenant_email}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Stage
                </Typography>
                <Typography variant="body1">{leaseData.stage}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Dates
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Start Date
                </Typography>
                <Typography variant="body1">
                  {new Date(leaseData.start_date).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  End Date
                </Typography>
                <Typography variant="body1">
                  {new Date(leaseData.end_date).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Created At
                </Typography>
                <Typography variant="body1">
                  {new Date(leaseData.created_at).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Updated At
                </Typography>
                <Typography variant="body1">
                  {leaseData.updated_at ? new Date(leaseData.updated_at).toLocaleDateString() : "N/A"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Financial Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Rent Amount
                </Typography>
                <Typography variant="body1">
                  ${leaseData.rent_amount}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Deposit Amount
                </Typography>
                <Typography variant="body1">
                  ${leaseData.deposit_amount}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Agreement to Lease
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="body2">{leaseData.agreement_to_lease}</Typography>
            </Paper>
          </Grid>

          {leaseData.application_data && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Application Data
              </Typography>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="body2" component="pre" sx={{ margin: 0, whiteSpace: "pre-wrap" }}>
                  {JSON.stringify(leaseData.application_data, null, 2)}
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  )
} 