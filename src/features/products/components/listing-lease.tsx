import { DataTable as ProductTable } from "@/components/ui/table/data-table";
import { columns } from "./product-tables/columns_lease";
import { getAllLeases } from "@/db/queries/leases";
import { getCurrentStage, WorkflowState, WORKFLOW_IDS } from "@/constants/workflow";
import { getUserRole, userRoles } from "@/constants/config";
import { SearchParams } from "nuqs/server";

type ListingLeasePageProps = {
  searchParams: SearchParams;
};

export default async function ListingLeasePage({ searchParams }: ListingLeasePageProps) {
  const { email, role } = await getUserRole();
  const stageFilter = typeof searchParams?.categories === 'string' ? searchParams.categories : '';

  const filterFunction = (property: any) => {
    // Role-based filtering
    if (role == userRoles.ADMIN) {
      // user is admin, show all leases of the property
      return true;
    } else if (role == userRoles.LAWYER) {
      // user is lawyer, show leases in legal review or draft contract stage
      const stage = getCurrentStage(property.state as WorkflowState[]);
      return stage == WORKFLOW_IDS.LEGAL_REVIEW || stage == WORKFLOW_IDS.DRAFT_CONTRACT;
    } else if (role == userRoles.TENANT) {
      // user is tenant, only show their own leases
      return property.tenant_email === email;
    } else if (role == userRoles.LANDLORD) {
      // user is landlord, only show leases in landlord review stage
      // TODO: check if the landlord is the owner of the property
      const stage = getCurrentStage(property.state as WorkflowState[]);
      return stage == WORKFLOW_IDS.LANDLORD_REVIEW;
    } else {
      // user is unknown, show no leases
      return false;
    }
  };

  const leases = await getAllLeases();
  let filteredLeases = leases.filter(filterFunction);

  // Apply stage filter if present
  if (stageFilter) {
    filteredLeases = filteredLeases.filter((lease: any) => {
      const stage = getCurrentStage(lease.state as WorkflowState[]);
      // Support multi-select if needed (split by '.')
      const allowedStages = stageFilter.split('.');
      return allowedStages.includes(stage);
    });
  }

  const lease: any = filteredLeases.map((res) => ({
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
      url={"/dashboard/lease/:id"}
    />
  );
}
