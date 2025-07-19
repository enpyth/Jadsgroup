import {
  PersonalInfoSection,
  IdentificationSection,
  AddressesSection,
  BusinessInfoSection,
  FinancialInfoSection,
  RentalHistorySection,
  TradeReferenceSection,
  PrivacyAcknowledgmentSection,
} from "@/features/lease-application/components";
import { Divider, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ApplicationData } from "types";
import { InferSelectModel } from "drizzle-orm";
import { leases } from "@/db/schema";

type LeaseData = InferSelectModel<typeof leases>;

export default function FormReviewPage({
  leaseData,
}: {
  leaseData: LeaseData;
}) {
  const applicationData = leaseData.application_data as ApplicationData;

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Grid container spacing={3}>
        <PersonalInfoSection data={applicationData.personal_info} />
        <Grid size={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        <IdentificationSection data={applicationData.identification} />
        <Grid size={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        <AddressesSection data={applicationData.addresses} />
        <Grid size={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        <BusinessInfoSection data={applicationData.business_info} />
        <Grid size={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        <FinancialInfoSection data={applicationData.financial_info} />
        <Grid size={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        <RentalHistorySection data={applicationData.rental_history} />
        <Grid size={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        <TradeReferenceSection data={applicationData.trade_reference} />
        <Grid size={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        <PrivacyAcknowledgmentSection
          data={applicationData.privacy_acknowledgment}
        />
      </Grid>
    </Container>
  );
}
