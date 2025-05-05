import { getUserRole, userRoles } from "@/constants/config";

export default async function MaintenancePage() {
  const { email, role } = await getUserRole();
  if (role == userRoles.ADMIN) {
    return <div>{email}, you are admin</div>;
  } else {
    return <div>{email}, you are not admin</div>;
  }
}
