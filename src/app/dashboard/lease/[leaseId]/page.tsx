import WorkflowPage from "@/features/workflow/workflow-page";
import { getLeaseById } from "@/db/queries/leases";
import { getUserRole } from "@/constants/config";
type PageProps = {
  params: Promise<{
    leaseId: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const leaseId = parseInt(resolvedParams.leaseId);
  const leaseData = await getLeaseById(leaseId);
  const { role } = await getUserRole();

  return <WorkflowPage leaseData={leaseData[0]} role={role} />;
}
