import WorkflowPage from "@/features/workflow/workflow-page"
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    return redirect('/');
  }

  return (
    // <ThemeProvider theme={theme}>
      // <CssBaseline />
      <WorkflowPage user_email={session?.user?.email || ''} />
    // </ThemeProvider>
  )
}

