import { auth } from "@/lib/auth";

export const userRoles = {
  ADMIN: "Admin",
  LAWYER: "Lawyer",
  TENANT: "Tenant",
  LANDLORD: "Landlord",
  UNKNOWN: "Unknown",
};

type userRole = keyof typeof userRoles;

const AdminList = ["admin@gmail.com", "zhangsu1305@gmail.com"];
const LawyerList = ["lawyer@gmail.com", "lawyer1@gmail.com"];
const LandlordList = ["landlord@gmail.com", "landlord1@gmail.com"];
export async function getUserRole(): Promise<{
  email: string;
  role: userRole;
}> {
  const session = await auth();
  const email = session?.user?.email || "";
  if (email == "") {
    return { email, role: userRoles.UNKNOWN as userRole };
  } else if (AdminList.includes(email)) {
    return { email, role: userRoles.ADMIN as userRole };
  } else if (LawyerList.includes(email)) {
    return { email, role: userRoles.LAWYER as userRole };
  } else if (LandlordList.includes(email)) {
    return { email, role: userRoles.LANDLORD as userRole };
  } else {
    return { email, role: userRoles.TENANT as userRole };
  }
}

// the routes that don't need layout
export const noLayoutRoutes = ["/error", "/login", "/dashboard"];
