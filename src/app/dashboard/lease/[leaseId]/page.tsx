import WorkflowPage from "@/features/workflow/workflow-page";
import { getLeaseWithProperty } from "@/db/queries/leases";
import { getUserRole } from "@/constants/config";

type PageProps = {
  params: { leaseId: string } | Promise<{ leaseId: string }>;
};

export default async function Page({ params }: PageProps) {
  const { leaseId } = await params;
  const leaseIdInt = parseInt(leaseId);

  if (isNaN(leaseIdInt)) {
    throw new Error(`Invalid leaseId: ${leaseId}`);
  }

  const leaseDataArr = await getLeaseWithProperty(leaseIdInt);
  if (!leaseDataArr || leaseDataArr.length === 0) return null;
  const leaseDataWithProperty = leaseDataArr[0];
  const { role } = await getUserRole();

  return <WorkflowPage leaseData={leaseDataWithProperty} role={role} />;
}
