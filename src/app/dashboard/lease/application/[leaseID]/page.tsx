import { getLeaseById } from "@/db/queries/leases";
import FormReviewPage from "@/features/lease-application/form-review-page";

type PageProps = {
  params: { leaseId: string } | Promise<{ leaseId: string }>;
};

export default async function LeaseFormPage({ params }: PageProps) {
  const { leaseId } = await params;
  const leaseIdInt = parseInt(leaseId);

  if (isNaN(leaseIdInt)) {
    throw new Error(`Invalid leaseId: ${leaseId}`);
  }

  const leaseData = await getLeaseById(leaseIdInt);
  return <FormReviewPage leaseData={leaseData[0]} />;
}
