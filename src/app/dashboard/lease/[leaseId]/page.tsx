import WorkflowPage from "@/features/workflow/workflow-page"
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

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
  const leaseId = resolvedParams.leaseId

  return (
    // <ThemeProvider theme={theme}>
      // <CssBaseline />
      <WorkflowPage leaseId={leaseId} user_email={session?.user?.email || ''} />
    // </ThemeProvider>
  )
}

