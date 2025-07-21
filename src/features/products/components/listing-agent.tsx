import { DataTable as ProductTable } from "@/components/ui/table/data-table";
import { columns } from "./product-tables/columns_agent";
import { getAllAgents } from "@/db/queries/properties";
import { getUserRole, userRoles } from "@/constants/config";

export default async function ListingAgentPage() {
  const { role } = await getUserRole();
  const filterFunction = (agent: any) => {
    if (role == userRoles.ADMIN) {
      return true;
    } else {
      // user is unknown, show no agents
      return false;
    }
  };

  const agents = await getAllAgents();
  const agentData: any = agents.filter(filterFunction).map((res) => ({
    id: res.agent_id, // For compatibility with CellAction
    agent_id: res.agent_id,
    name: res.name,
    phone: res.phone,
    email: res.email,
    agency_name: res.agency_name,
    created_at: new Date(res.created_at).toLocaleString("en-AU", {
      timeZone: "Australia/Adelaide",
    }),
  }));

  return (
    <ProductTable
      columns={columns}
      data={agentData}
      totalItems={agentData.length}
      url={"/dashboard/agent/:id"}
    />
  );
}
