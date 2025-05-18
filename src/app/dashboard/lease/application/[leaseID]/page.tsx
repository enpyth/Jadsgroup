import { getLeaseById } from "@/db/queries/leases";
import FormReviewPage from "@/features/lease-application/form-review-page";

type PageProps = {
  params: Promise<{ leaseId: string }>;
};

export default async function LeaseFormPage({ params }: PageProps) {
  const resolvedParams = await params;
  const leaseId = parseInt(resolvedParams.leaseId);
  const leaseData = await getLeaseById(leaseId);

  return <FormReviewPage leaseData={leaseData[0]} />;
}
