import WorkflowPage from "@/features/workflow/workflow-page";
import { getLeaseWithProperty } from "@/db/queries/leases";
import { getUserRole } from "@/constants/config";

type PageProps = {
  params: Promise<{
    leaseId: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const leaseId = parseInt(resolvedParams.leaseId);
  const leaseDataArr = await getLeaseWithProperty(leaseId);
  if (!leaseDataArr || leaseDataArr.length === 0) return null;
  const leaseDataWithProperty = leaseDataArr[0];
  const { role } = await getUserRole();

  return <WorkflowPage leaseData={leaseDataWithProperty} role={role} />;
}
