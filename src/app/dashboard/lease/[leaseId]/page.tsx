import WorkflowPage from "@/features/workflow/workflow-page"
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { leaseId: string } }) {
  const session = await auth();
  if (!session?.user) {
    return redirect('/');
  }

  return (
    // <ThemeProvider theme={theme}>
      // <CssBaseline />
      <WorkflowPage leaseId={params.leaseId} user_email={session?.user?.email || ''} />
    // </ThemeProvider>
  )
}

