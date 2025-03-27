import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { isCustomer } from '@/constants/data';

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    return redirect('/');
  } else {
    isCustomer(session?.user?.email || '') ? redirect('/dashboard/lease') :
    redirect('/dashboard/property');
  }
}
