import { Container, Alert } from "@mui/material";
import { getLeaseById } from "@/db/queries/leases";
import { ApplicationData } from "@/features/lease-application/types";

import FormReviewPage from "@/features/lease-application/form-review-page";

type PageProps = {
  params: { leaseId: string };
};

export default async function LeaseFormPage({ params }: PageProps) {
  const resolvedParams = await params;
  const leaseId = parseInt(resolvedParams.leaseId);
  const result = await getLeaseById(leaseId);
  const leaseData = result[0];

  if (!leaseData) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">No lease data found</Alert>
      </Container>
    );
  }

  const applicationData = leaseData.application_data as ApplicationData;

  return <FormReviewPage applicationData={applicationData} />;
}
