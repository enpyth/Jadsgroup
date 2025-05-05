import { redirect } from 'next/navigation';
import { getUserRole, userRoles } from '@/constants/config';

export default async function Dashboard() {
  const { email, role } = await getUserRole();
  console.log(`Login Dashboard. Email: ${email}, Role: ${role}`);
  if (role == userRoles.UNKNOWN) {
    redirect('/login');
  } else {
    return redirect('/dashboard/lease');
  }
}
