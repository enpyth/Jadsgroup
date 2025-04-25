import { isCustomer, Lease } from '@/constants/data';
import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './product-tables/columns_lease';
import { auth } from '@/lib/auth';
import { getAllLeases } from '@/db/queries/leases';

type LeaseListingPageProps = {
  propertyId?: string;
};

export default async function LeaseListingPage({ propertyId }: LeaseListingPageProps) {
  const session = await auth();

  // different filter depends on current email and propertyId
  const filterFunction = (property: any) => {
    if (isCustomer(session?.user?.email || '')) {
      return property.tenant_email === session?.user?.email;
    } else if (propertyId) {
      return property.property_id === Number(propertyId);
    }
    return true;
  };

  // 筛选租户在数组中的产品
  const leases = await getAllLeases();
  const lease: any = leases
    .filter(filterFunction)
    .map(res => ({
      id: res.lease_id,
      property_id: res.property_id,
      property_name: res.property_name,
      tenant_email: res.tenant_email,
      start_date: res.start_date,
      end_date: res.end_date,
      rent_amount: res.rent_amount,
      deposit_amount: res.deposit_amount,
      stage: res.stage,
      agreement_to_lease: res.agreement_to_lease,
      created_at: new Date(res.created_at).toLocaleDateString()
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
