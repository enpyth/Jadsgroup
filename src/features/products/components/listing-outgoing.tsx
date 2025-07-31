import { DataTable as ProductTable } from "@/components/ui/table/data-table";
import { columns } from "./product-tables/columns_outgoing";
import { getAllLeases } from "@/db/queries/leases";
import { getAllOutgoings } from "@/db/queries/outgoings";
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

  const [leases, outgoings] = await Promise.all([
    getAllLeases(),
    getAllOutgoings()
  ]);

  // Create a map of lease_id to outgoing data
  const outgoingMap = new Map();
  outgoings.forEach((outgoing: any) => {
    outgoingMap.set(outgoing.lease_id, outgoing);
  });

  const lease: any = leases.filter(filterFunction).map((res: any) => {
    const outgoing = outgoingMap.get(res.lease_id);
    return {
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
      invoice_id: outgoing?.invoice_id || "",
      invoice_img: outgoing?.invoice_img || "placeholder.jpg",
      created_at: new Date(res.created_at).toLocaleString("en-AU", {
        timeZone: "Australia/Adelaide",
      }),
    };
  });

  return (
    <ProductTable
      columns={columns}
      data={lease}
      totalItems={lease.length}
      url={"/dashboard/outgoings/:id"}
    />
  );
}
