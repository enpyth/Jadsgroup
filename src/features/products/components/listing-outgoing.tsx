import { DataTable as ProductTable } from "@/components/ui/table/data-table";
import { columns } from "./product-tables/columns_lease";
import { getAllLeases } from "@/db/queries/leases";
import { getCurrentStage, WorkflowState, WORKFLOW_IDS } from "@/constants/workflow";
import { getUserRole, userRoles } from "@/constants/config";

export default async function ListingOutgoingPage() {
  const { role } = await getUserRole();
  const filterFunction = (property: any) => {
    if (role == userRoles.ADMIN) {
      const stage = getCurrentStage(property.state as WorkflowState[]);
      return stage != WORKFLOW_IDS.COMPLETED;
    } else {
      // user is unknown, show no leases
      return false;
    }
  };

  const leases = await getAllLeases();
  const lease: any = leases.filter(filterFunction).map((res) => ({
    id: res.lease_id,
    property_id: res.property_id,
    property_name: res.property_name,
    tenant_email: res.tenant_email,
    start_date: res.start_date,
    end_date: res.end_date,
    rent_amount: res.rent_amount,
    deposit_amount: res.deposit_amount,
    stage: getCurrentStage(res.state as WorkflowState[]),
    agreement_to_lease: res.agreement_to_lease,
    created_at: new Date(res.created_at).toLocaleString("en-AU", {
      timeZone: "Australia/Adelaide",
    }),
  }));

  return (
    <ProductTable
      columns={columns}
      data={lease}
      totalItems={lease.length}
      url={"/dashboard/outgoings/:id"}
    />
  );
}
