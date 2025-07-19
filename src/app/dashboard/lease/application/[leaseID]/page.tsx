import { getLeaseById } from "@/db/queries/leases";
import FormReviewPage from "@/features/lease-application/form-review-page";

type PageProps = {
  params: { leaseID: string } | Promise<{ leaseID: string }>;
};

export default async function LeaseFormPage({ params }: PageProps) {
  console.log("params", params);
  const { leaseID } = await params;
  const leaseIdInt = parseInt(leaseID);

  if (isNaN(leaseIdInt)) {
    throw new Error(`Invalid leaseID: ${leaseID}`);
  }

  const leaseData = await getLeaseById(leaseIdInt);
  return <FormReviewPage leaseData={leaseData[0]} />;
}
