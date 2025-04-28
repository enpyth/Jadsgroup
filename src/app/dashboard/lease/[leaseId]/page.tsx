import WorkflowPage from "@/features/workflow/workflow-page"
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getLeaseById } from "@/db/queries/leases"
import { generateInitialProcesses } from "@/constants/workflow"

type PageProps = {
  params: Promise<{
    leaseId: string
  }>
}

export default async function Page({ params }: PageProps) {
  const session = await auth();
  if (!session?.user) {
    return redirect('/');
  }

  const resolvedParams = await params
  const leaseId = parseInt(resolvedParams.leaseId)
  const processes = generateInitialProcesses()
  const leaseData = await getLeaseById(leaseId)

  return (
    <WorkflowPage
      leaseData={leaseData[0]}
      user_email={session?.user?.email || ''}
      processes={processes}
    />
  )
}

